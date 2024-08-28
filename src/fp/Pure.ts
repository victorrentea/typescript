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
    // resolvedPrice?: number; // N!O!
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

interface CustomerApi {
    findById(id: number): Promise<Customer>;
}

interface ThirdPartyPricesApi {
    fetchPrice(productId: number): Promise<number>;
}

interface CouponApi {
    markUsedCoupons(customerId: number, usedCoupons: Coupon[]): Promise<void>;
}

interface ProductApi {
    findAllById(productIds: number[]): Promise<Product[]>;
}

class Pure {
    constructor(
        private readonly customerApi: CustomerApi,
        private readonly thirdPartyPricesApi: ThirdPartyPricesApi,
        private readonly couponRepo: CouponApi,
        private readonly productApi: ProductApi
    ) {
    }

    // TODO extract a pure function with as much logic possible
    async computePrices(customerId: number,
                        productIds: number[],
                        internalPrices: Map<number, number>
    ): Promise<Map<number, number>> {

        //aplied split phase refactor
        // phase 1: fetch data
        const customer = await this.customerApi.findById(customerId); // IO: GET/SELECT .. WHERE ID = ?
        const products = await this.productApi.findAllById(productIds);  // GET many?id=1,2,3/SELECT .. WHERE ID IN (?, ?, ?)

        // phase 2: resolve prices
        const resolvedPrices = new Map<number, number>();
        for (const product of products) {
            let price: number | undefined = internalPrices.get(product.id);
            if (!price) {
                price = await this.thirdPartyPricesApi.fetchPrice(product.id); // GET
            }
            // product.resolvedPrice = price; // BAD: temporary field code smell, abusing our core object burdening it with extra temporary data.
            // finalPrices.set(product.id, price); // BAD: because the map values now carry different meanings in different parts of the code
            resolvedPrices.set(product.id, price);
        }

        // phase 3: apply coupons
        const usedCoupons: Coupon[] = []; // accumulator variables
        const finalPrices = new Map<number, number>();
        for (const product of products) {
            let price = resolvedPrices.get(product.id);
            for (const coupon of customer.coupons()) {
                if (coupon.autoApply && coupon.isApplicableFor(product) && !usedCoupons.includes(coupon)) {
                    price = coupon.apply(product, price);
                    usedCoupons.push(coupon);
                }
            }
            finalPrices.set(product.id, price);
        }

        // phase 4: side effects
        await this.couponRepo.markUsedCoupons(customerId, usedCoupons); // INSERT // side effect
        return finalPrices;
    }
}