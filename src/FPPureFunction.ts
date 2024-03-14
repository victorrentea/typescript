import {Coupon, Customer, Product} from "./FPmodel";

type CustomerApi = {
    findById(id: number): Customer;
};
type ThirdPartyPricesApi = {
    fetchPrice(productId: number): number;
};
type CouponApi = {
    markUsedCoupons(customerId: number, usedCoupons: Coupon[]): void;
};
type ProductApi = {
    findAllById(productIds: number[]): Product[];
};

class FPPureFunction {
    constructor(
        private readonly customerApi: CustomerApi,
        private readonly thirdPartyPricesApi: ThirdPartyPricesApi,
        private readonly couponRepo: CouponApi,
        private readonly productApi: ProductApi
    ) {
    }

    // TODO extract a pure function with as much logic possible
    computePrices(customerId: number, productIds: number[], internalPrices: Map<number, number>): Map<number, number> {
        const customer: Customer = this.customerApi.findById(customerId);
        const products: Product[] = this.productApi.findAllById(productIds);

        const usedCoupons: Coupon[] = [];
        const finalPrices: Map<number, number> = new Map<number, number>();
        for (const product of products) {
            let price: number | undefined = internalPrices.get(product.id);
            if (price === undefined) {
                price = this.thirdPartyPricesApi.fetchPrice(product.id);
            }
            for (const coupon of customer.coupons()) {
                if (coupon.autoApply && coupon.isApplicableFor(product) && !usedCoupons.includes(coupon)) {
                    price = coupon.apply(product, price);
                    usedCoupons.push(coupon);
                }
            }
            finalPrices.set(product.id, price);
        }

        this.couponRepo.markUsedCoupons(customerId, usedCoupons);
        return finalPrices;
    }
}