"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordPaymentUsecase = exports.Try = void 0;
// * Core Domain
const AsyncEither_1 = require("../../../../core/logic/AsyncEither");
const DomainEvents_1 = require("../../../../core/domain/events/DomainEvents");
const Either_1 = require("../../../../core/logic/Either");
const AppError_1 = require("../../../../core/logic/AppError");
const Invoice_1 = require("../../../invoices/domain/Invoice");
const external_order_id_1 = require("../../domain/external-order-id");
const Payment_1 = require("../../domain/Payment");
const getItemsForInvoice_1 = require("../../../invoices/usecases/getItemsForInvoice/getItemsForInvoice");
const getInvoiceDetails_1 = require("../../../invoices/usecases/getInvoiceDetails/getInvoiceDetails");
const getManuscriptByInvoiceId_1 = require("../../../manuscripts/usecases/getManuscriptByInvoiceId");
const getPayerDetailsByInvoiceId_1 = require("../../../payers/usecases/getPayerDetailsByInvoiceId");
const getPaymentsByInvoiceId_1 = require("../getPaymentsByInvoiceId");
const createPayment_1 = require("../createPayment");
const Errors = require("./recordPaymentErrors");
// class Try<T> extends Either<T, Error> {}
class Try {
    constructor(data, error) {
        this.data = data;
        this.error = error;
    }
    static success(data) {
        return new Try(data, null);
    }
    static error(error) {
        return new Try(null, error);
    }
}
exports.Try = Try;
class RecordPaymentUsecase {
    constructor(strategyFactory, invoiceItemRepo, manuscriptRepo, paymentRepo, invoiceRepo, couponRepo, waiverRepo, payerRepo, logger) {
        this.strategyFactory = strategyFactory;
        this.invoiceItemRepo = invoiceItemRepo;
        this.manuscriptRepo = manuscriptRepo;
        this.paymentRepo = paymentRepo;
        this.invoiceRepo = invoiceRepo;
        this.couponRepo = couponRepo;
        this.waiverRepo = waiverRepo;
        this.payerRepo = payerRepo;
        this.logger = logger;
        this.attachExistingPayments = this.attachExistingPayments.bind(this);
        this.attachPaymentIfExists = this.attachPaymentIfExists.bind(this);
        this.attachInvoiceItems = this.attachInvoiceItems.bind(this);
        this.attachManuscript = this.attachManuscript.bind(this);
        this.shouldPayInvoice = this.shouldPayInvoice.bind(this);
        this.validateRequest = this.validateRequest.bind(this);
        this.attachStrategy = this.attachStrategy.bind(this);
        this.attachInvoice = this.attachInvoice.bind(this);
        this.updatePayment = this.updatePayment.bind(this);
        this.attachPayer = this.attachPayer.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.pay = this.pay.bind(this);
    }
    execute(request, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new AsyncEither_1.AsyncEither(request)
                    .then(this.validateRequest)
                    .then(this.attachInvoice(context))
                    .then(this.attachInvoiceItems(context))
                    .then(this.attachExistingPayments(context))
                    .then(this.shouldPayInvoice)
                    .then(this.attachPayer(context))
                    .then(this.attachManuscript(context))
                    .then(this.attachStrategy)
                    .then(this.pay)
                    .then(this.savePayment(context))
                    .map((data) => data.payment)
                    .execute();
                return result;
            }
            catch (e) {
                return (0, Either_1.left)(this.newUnexpectedError(e, request.invoiceId));
            }
        });
    }
    validateRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.invoiceId) {
                // return left(new Errors.InvoiceIdRequiredError());
                return Try.error(new Errors.InvoiceIdRequiredError());
            }
            if (!request.datePaid) {
                return (0, Either_1.left)(new Errors.PaymentDateRequiredError());
            }
            return Try.success(request);
        });
    }
    attachInvoice(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            const usecase = new getInvoiceDetails_1.GetInvoiceDetailsUsecase(this.invoiceRepo /*, username*/);
            return new AsyncEither_1.AsyncEither(request.invoiceId)
                .then((invoiceId) => usecase.execute({ invoiceId }, context /*username*/))
                .map((invoice) => (Object.assign(Object.assign({}, request), { invoice })))
                .execute();
        });
    }
    attachInvoiceItems(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            const usecase = new getItemsForInvoice_1.GetItemsForInvoiceUsecase(this.invoiceItemRepo, this.couponRepo, this.waiverRepo);
            return new AsyncEither_1.AsyncEither(request.invoice.id.toString())
                .then((invoiceId) => usecase.execute({ invoiceId }, context))
                .map((items) => {
                request.invoice.addItems(items);
                return Object.assign(Object.assign({}, request), { invoiceItems: items });
            })
                .execute();
        });
    }
    attachExistingPayments(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            const usecase = new getPaymentsByInvoiceId_1.GetPaymentsByInvoiceIdUsecase(this.invoiceRepo, this.paymentRepo);
            return new AsyncEither_1.AsyncEither(request.invoiceId)
                .then((invoiceId) => usecase.execute({ invoiceId }, context))
                .map((existingPayments) => (Object.assign(Object.assign({}, request), { existingPayments })))
                .execute();
        });
    }
    shouldPayInvoice(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { existingPayments, invoiceItems, invoice } = request;
            const invoiceId = invoice.id.toString();
            if (invoice.status === Invoice_1.InvoiceStatus.DRAFT) {
                return (0, Either_1.left)(new Errors.InvoiceCannotBePaidError(invoiceId));
            }
            if (invoice.status !== Invoice_1.InvoiceStatus.ACTIVE) {
                return (0, Either_1.left)(new Errors.InvoiceAlreadyPaidError(invoice.persistentReferenceNumber));
            }
            if (existingPayments.some((p) => p.status === Payment_1.PaymentStatus.PENDING)) {
                return (0, Either_1.left)(new Errors.PaymentPendingError(invoiceId));
            }
            const paidTotal = existingPayments
                .filter((p) => p.status === Payment_1.PaymentStatus.COMPLETED)
                .reduce((sum, p) => sum + p.amount.value, 0);
            if (paidTotal >= invoice.invoiceTotal) {
                return (0, Either_1.left)(new Errors.InvoiceAlreadyPaidError(invoice.persistentReferenceNumber));
            }
            return (0, Either_1.right)(request);
        });
    }
    attachPayer(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            const usecase = new getPayerDetailsByInvoiceId_1.GetPayerDetailsByInvoiceIdUsecase(this.payerRepo, this.logger);
            return new AsyncEither_1.AsyncEither(request.invoiceId)
                .then((invoiceId) => usecase.execute({ invoiceId }, context))
                .map((payer) => (Object.assign(Object.assign({}, request), { payer })))
                .execute();
        });
    }
    attachManuscript(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            const usecase = new getManuscriptByInvoiceId_1.GetManuscriptByInvoiceIdUsecase(this.manuscriptRepo, this.invoiceItemRepo);
            return new AsyncEither_1.AsyncEither(request.invoiceId)
                .then((invoiceId) => usecase.execute({ invoiceId }, context))
                // .map((manuscripts) =>({ ...request, manuscripts:manuscripts[0] }))
                .map((manuscripts) => manuscripts[0])
                .map((manuscript) => (Object.assign(Object.assign({}, request), { manuscript })))
                .execute();
        });
    }
    attachStrategy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { payerIdentification, paymentReference } = request;
            const strategy = yield this.strategyFactory.selectStrategy({
                payerIdentification,
                paymentReference,
            });
            return (0, Either_1.right)(Object.assign(Object.assign({}, request), { strategy }));
        });
    }
    pay(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { payerIdentification, paymentReference, manuscript, strategy, invoice, } = request;
            const makePaymentData = {
                netAmountBeforeDiscount: invoice.netTotalBeforeDiscount,
                invoiceReferenceNumber: invoice.persistentReferenceNumber,
                discountAmount: invoice.invoiceDiscountTotal,
                manuscriptCustomId: manuscript.customId,
                invoiceTotal: invoice.invoiceTotal,
                netAmount: invoice.invoiceNetTotal,
                vatAmount: invoice.invoiceVatTotal,
                invoiceId: invoice.id.toString(),
                payerIdentification,
                paymentReference,
            };
            return new AsyncEither_1.AsyncEither(makePaymentData)
                .then((data) => request.strategy.makePayment(data))
                .map((paymentDetails) => (Object.assign(Object.assign({}, request), { paymentDetails })))
                .execute();
        });
    }
    //
    // private async pay(request: PaymentData) {
    //   // private async pay<T extends PaymentData>(request: T) {
    //   const makePaymentData = this.paymentDto(request);
    //
    //   return request;
    // }
    // private paymentDto(request: PaymentData) {
    //   const {
    //     payerIdentification,
    //     paymentReference,
    //     manuscript,
    //     strategy,
    //     invoice,
    //   } = request;
    //   return {
    //     netAmountBeforeDiscount: invoice.netTotalBeforeDiscount,
    //     invoiceReferenceNumber: invoice.persistentReferenceNumber,
    //     discountAmount: invoice.invoiceDiscountTotal,
    //     manuscriptCustomId: manuscript.customId,
    //     invoiceTotal: invoice.invoiceTotal,
    //     netAmount: invoice.invoiceNetTotal,
    //     vatAmount: invoice.invoiceVatTotal,
    //     invoiceId: invoice.id.toString(),
    //     payerIdentification,
    //     paymentReference,
    //   };
    // }
    attachPaymentIfExists(context) {
        const usecase = new getPaymentsByInvoiceId_1.GetPaymentsByInvoiceIdUsecase(this.invoiceRepo, this.paymentRepo);
        return (request) => __awaiter(this, void 0, void 0, function* () {
            return new AsyncEither_1.AsyncEither(request.invoiceId)
                .then((invoiceId) => usecase.execute({ invoiceId }, context))
                .map((result) => result)
                .map((payments) => {
                return payments
                    .filter((payment) => payment.status === Payment_1.PaymentStatus.CREATED)
                    .filter((payment) => payment.paymentMethodId.toString() === request.paymentMethodId);
            })
                .map((payments) => {
                if (payments.length === 0) {
                    return null;
                }
                else {
                    return payments[0];
                }
            })
                .map((existingPayment) => (Object.assign(Object.assign({}, request), { existingPayment })))
                .execute();
        });
    }
    updatePayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.paymentDetails.status !== request.payment.status) {
                    request.payment.status = request.paymentDetails.status;
                }
                const maybeUpdated = yield this.paymentRepo.updatePayment(request.payment);
                if (maybeUpdated.isLeft()) {
                    return (0, Either_1.left)(new AppError_1.UnexpectedError(new Error(maybeUpdated.value.message)));
                }
                const updated = maybeUpdated.value;
                if (updated.status === Payment_1.PaymentStatus.COMPLETED) {
                    updated.addCompletedEvent(request.isFinalPayment);
                }
                DomainEvents_1.DomainEvents.dispatchEventsForAggregate(updated.id);
                return (0, Either_1.right)(updated);
            }
            catch (err) {
                return (0, Either_1.left)(new Errors.PaymentUpdateDbError(request.payment.invoiceId.toString(), err));
            }
        });
    }
    savePayment(context) {
        return (request) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const usecaseSave = new createPayment_1.CreatePaymentUsecase(this.paymentRepo);
            const { paymentDetails, datePaid, invoice, amount, payer } = request;
            const dto = {
                foreignPaymentId: paymentDetails.foreignPaymentId.id.trim(),
                paymentMethodId: paymentDetails.paymentMethodId.toString(),
                isFinalPayment: (_a = request.isFinalPayment) !== null && _a !== void 0 ? _a : true,
                amount: amount !== null && amount !== void 0 ? amount : invoice.invoiceTotal,
                paymentDetails: request.paymentDetails,
                invoiceId: invoice.id.toString(),
                status: paymentDetails.status,
                payerId: payer.id.toString(),
                datePaid,
            };
            const maybeWithPayment = new AsyncEither_1.AsyncEither(dto).then(this.attachPaymentIfExists(context));
            const maybeCreateNewPayment = yield maybeWithPayment
                .advanceOrEnd((data) => __awaiter(this, void 0, void 0, function* () {
                if (data.existingPayment) {
                    return (0, Either_1.right)(false);
                }
                return (0, Either_1.right)(true);
            }))
                .then((data) => usecaseSave.execute(data, context))
                .map((payment) => (Object.assign(Object.assign({}, request), { payment })))
                .execute();
            const maybeUpdatePayment = yield maybeWithPayment
                .advanceOrEnd((data) => __awaiter(this, void 0, void 0, function* () {
                if (data.existingPayment) {
                    return (0, Either_1.right)(true);
                }
                return (0, Either_1.right)(false);
            }))
                .map((request) => {
                const { existingPayment, foreignPaymentId } = request;
                existingPayment.foreignPaymentId = external_order_id_1.ExternalOrderId.create(foreignPaymentId);
                return Object.assign(Object.assign({}, request), { payment: existingPayment });
            })
                .then(this.updatePayment)
                .map((payment) => (Object.assign(Object.assign({}, request), { payment })))
                .execute();
            return (0, AsyncEither_1.flattenEither)([maybeCreateNewPayment, maybeUpdatePayment]).map(([saveValue, updateValue]) => {
                if (saveValue.payment) {
                    return saveValue;
                }
                return updateValue;
            });
        });
    }
    newUnexpectedError(e, id) {
        return new AppError_1.UnexpectedError(e, `Recording payment for invoice with id {${id}}`);
    }
}
exports.RecordPaymentUsecase = RecordPaymentUsecase;
