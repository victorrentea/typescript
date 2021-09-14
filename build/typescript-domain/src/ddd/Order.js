"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.OrderLine = exports.Order = exports.ShipmentService = exports.Shipment = exports.OrderBilling = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DRAFT"] = "DRAFT";
    OrderStatus["PLACED"] = "PLACED";
    OrderStatus["SHIPPED"] = "SHIPPED";
})(OrderStatus || (OrderStatus = {}));
class OrderBilling {
    constructor(name, address, country, VATCode) {
        this.name = name;
        this.address = address;
        this.country = country;
        this.VATCode = VATCode;
    }
}
exports.OrderBilling = OrderBilling;
class Shipment {
}
exports.Shipment = Shipment;
class ShipmentService {
}
exports.ShipmentService = ShipmentService;
class Order {
    // private billing: OrderBilling;
    // public setOrderLineCount(product:Product, newCount:number, repo:OrderLineRepo) { // okish
    //     if (status nu e bun) {
    //         throw
    //     }
    //     OrderLine orderLine = repo.findByProduct(product.id);
    //     repo.deleteBy..
    //     repo.save(new OrderLine())
    // }
    constructor(orderLines) {
        this._orderLines = []; // 1M
        this._totalPrice = 0;
        if (!orderLines || !orderLines.length) {
            throw new Error("Min 1 line");
        }
        // this._orderLines= new Array(...orderLines);
        // this._totalPrice = this.computeTotalPri// ce();
        // orderLines.forEach(line => this.addOrderLine(line));
        // orderLines.forEach(this.addOrderLine, this);
        for (const orderLine of orderLines) {
            this.addOrderLine(orderLine);
        }
    }
    get status() {
        return this._status;
    }
    get shipDate() {
        return this._shipDate;
    }
    markAsShipped() {
        if (this._status != OrderStatus.PLACED) {
            throw new Error("Can only ship a PLACED order");
        }
        this._status = OrderStatus.SHIPPED;
        this._shipDate = new Date();
        // TODO emit OrderPlacedEvent(id) > ce credeti ca urmeaza:
        // a)  (mai lightweight)
        // b) pui intr-un queue
        // this._shipment = new Shipment();
        // case study: eventurile raman asociate intr-o tabela cu agregatul,
        // si la un moment dat le dau drumul (fire)
        // apoi un dispatcher livreaza eventurile in aceeasi aplicatie.
        // in acelasi thread.
        // in aceeasi Tranzactie :
        // >>> ? handlingul eventului aruncat dintr-un agregat il procesezi in:
        // (A) in aceeasi TX --> NU pot aparea inconsistenta
        // (B) in alta TX sau
        // (C) nu aveai la inceput (auto-commit) ~= B
    }
    get orderLines() {
        return this._orderLines;
    }
    get totalPrice() {
        return this._totalPrice;
    }
    addOrderLine(lineToAdd) {
        let existingLine = this._orderLines.find(line => line.product.equals(lineToAdd.product));
        if (existingLine) {
            this._orderLines.splice(this._orderLines.findIndex(line => line.equals(existingLine)), 1);
            let newCount = lineToAdd.count + existingLine.count;
            this.addOrderLine(new OrderLine(lineToAdd.product, newCount));
        }
        else {
            this._orderLines.push(lineToAdd);
        }
        this._totalPrice = this.computeTotalPrice();
    }
    computeTotalPrice() {
        return this._orderLines.reduce((acc, line) => acc + line.price, 0);
    }
    removeOrderLine(lineToRemove) {
        if (this._orderLines.length == 1) {
            throw new Error("Macar o linie sa ramana");
        }
        this._orderLines.splice(this._orderLines.findIndex(line => line.equals(lineToRemove)), 1);
        this._totalPrice = this.computeTotalPrice();
    }
}
exports.Order = Order;
class OrderLine {
    constructor(product, // TODO BUBA
    count) {
        this.product = product;
        this.count = count;
        if (count <= 0) {
            throw new Error("Count must be > 0");
        }
        if (!product) {
            throw new Error("Product must be set");
        }
    }
    get price() {
        return this.count * this.product.price;
    }
    equals(other) {
        return other.count === this.count &&
            other.product.equals(this.product);
    }
}
exports.OrderLine = OrderLine;
// export class OrderLineVO {
//     constructor(public readonly product: Product, public readonly count: number) {
//     }
// }
class Product {
    constructor(id, price) {
        this.id = id;
        this.price = price;
    }
    equals(other) {
        return true;
    }
}
exports.Product = Product;
// to test:
function cancelOrder(order) {
    console.log("Sending email: order#" + order.id + " was cancelled");
}
class TestData {
    // public static aPlacedOrder(object: Object):Order {
    //     this.aValidOrder().place().ship();
    // }
    static aValidOrder(object) {
        let orderLine = new OrderLine(new Product("P1", 10), 2);
        return Object.assign(new Order([orderLine]), object);
    }
}
// TEST:
let order1 = TestData.aValidOrder({ id: 13 /*, totalPrice:13*/ });
cancelOrder(order1);
console.log(order1.totalPrice);
let orderLine = new OrderLine(new Product("P1", 10), 2);
let order = new Order([orderLine]);
let product = new Product("P2", 3);
orderLine = new OrderLine(product, 3);
order.addOrderLine(orderLine);
// order.orderLines[0].addCount(1);
order.addOrderLine(new OrderLine(product, 1));
console.log(order.totalPrice);
// order.orderLines.splice()
// orderRepo.save(order, tx);
// TX 1 COMMIT
// eventul tau
// shipmentRepo.save(shipment, tx);
