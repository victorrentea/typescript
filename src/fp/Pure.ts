enum ProductCategory {
    ELECTRONICS,
    KIDS,
    ME,
    HOME,
    UNCATEGORIZED
}

type Product = {
    category: ProductCategory;
    isPremium: boolean;
    id: number;
    isDeleted: boolean;
};

class Coupon {
    private readonly category: ProductCategory;
    private readonly discountAmount: number;
    public readonly autoApply: boolean = true;

    constructor(category: ProductCategory, discountAmount: number) {
        this.category = category;
        this.discountAmount = discountAmount;
    }

    isApplicableFor(product: Product): boolean {
        return (product.category == this.category || this.category == null) && !product.isPremium;
    }

    apply(product: Product, price: number): number {
        if (!this.isApplicableFor(product)) {
            throw new Error("Illegal Argument Exception");
        }
        return price - this.discountAmount;
    }
}


type Customer = {
    coupons(): Coupon[];
};
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

class Pure {
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