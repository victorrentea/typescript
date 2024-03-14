export enum ProductCategory {
    ELECTRONICS,
    KIDS,
    ME,
    HOME,
    UNCATEGORIZED
}

export type Product = {
    category: ProductCategory;
    isPremium: boolean;
    id: number;
    isDeleted: boolean;
};

export class Coupon {
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


export type Customer = {
    coupons(): Coupon[];
};

export type Order = {
    creationDate: Date;
    active: boolean;
    price: number;
    orderLines: OrderLine[];
}
export type OrderLine = {
    product: Product;
    itemCount: number;
}
