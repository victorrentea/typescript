enum ProductCategory {
    ELECTRONICS,
    KIDS,
    ME,
    HOME,
    UNCATEGORIZED
}

type CustomerId = string
type ProductId = string

const customerId: CustomerId = "123";
const productId: ProductId = "456";

f(customerId, productId);
f(productId, customerId);

function f(c: CustomerId, p: ProductId) {

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

    // CouponApplier (NO:PriceHelper,or Util) class when it grows.
    static applyCoupons(products: Product[], resolvedPrices: Map<number, number>, customer: Customer) {
        // should I change the prod design just for testing?
        // improving = yes
        // breaking = no
        // ?? is making this method a big mistake (breaking encapsulation) private -> public.
        //     YES, it's a mistake => extract this method to a separate class
        //     NO imho
        const usedCoupons: Coupon[] = []; // accumulator variables
        const finalPrices = new Map<number, number>();
        for (const product of products) {
            let price = resolvedPrices.get(product.id) as number;
            // TODO 2024-08-28 vrentea - uncomment this code after PO replies to email sent on 28 aug
            // if (!price) { //after confirming with the PO. if PO is in holiday, add this code commeted out, send her an email
            //     throw new Error("Could not find price for product: " + product.id);
            // }
            for (const coupon of customer.coupons()) {
                if (coupon.autoApply && coupon.isApplicableFor(product) && !usedCoupons.includes(coupon)) {
                    price = coupon.apply(product, price);
                    usedCoupons.push(coupon);
                }
            }
            finalPrices.set(product.id, price);
        }
        return {usedCoupons, finalPrices};
    }

    // this is a pure function. Therefore it is NOT async, and it does use any dependencies, nor MOCK in test.
    // yee haa! tests without mocks. with subcutaneous tests.
    // i made it static to EXPRESS the fact it's pure. static method cannot use injected dependencies. Only parameters.
    // don't put in a Util. it's very specific to my flow. leave it here. Maybe move to a

    // TODO extract a pure function with as much logic possible
    async computePrices(customerId: number,
                        productIds: number[],
                        internalPrices: Map<number, number>
    ): Promise<Map<number, number>> {

        const customer = await this.customerApi.findById(customerId); // IO: GET/SELECT .. WHERE ID = ?
        const products = await this.productApi.findAllById(productIds);  // GET many?id=1,2,3/SELECT .. WHERE ID IN (?, ?, ?)

        // low lebvel
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

        // high level flow contrl
        // not desireable to return mutliple values from a single function
        const {usedCoupons, finalPrices} = Pure.applyCoupons(products, resolvedPrices, customer);
        // const {usedCoupons, finalPrices} = Pure.applyCoupons(products, resolvedPrices, customer);

        await this.couponRepo.markUsedCoupons(customerId, usedCoupons); // INSERT // side effect
        return finalPrices;
    }

}