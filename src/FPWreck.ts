import {expect} from "chai";
import {Order, Product, ProductCategory} from "./FPmodel";

type ProductApi = {
    getHiddenProductIds(): number[];
};


function differenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
}

export class FPWreck {
    constructor(private readonly productApi: ProductApi) {
    }

    public getFrequentOrderedProducts(orders: Order[]): Product[] {
		return Array.from(orders
			.filter(order => order.active)
			.filter(order => differenceInDays(new Date(), order.creationDate) < 365)
			.flatMap(order => order.orderLines)
			.reduce((productCountMap, orderLine) => {
				const product = orderLine.product;
				const count = productCountMap.get(product) || 0;
				productCountMap.set(product, count + orderLine.itemCount);
				return productCountMap;
			}, new Map<Product, number>())
			.entries())
			.filter(([product, count]) => count >= 10)
			.filter(([product]) => !product.isDeleted)
			.filter(([product]) => !this.productApi.getHiddenProductIds().includes(product.id))
			.map(([product]) => product);
	}
}

it('should return frequent ordered products', () => {
	const productApi = {
		getHiddenProductIds: () => [1, 2]
	};
	const streamWreck = new FPWreck(productApi);
	const p3 = {id: 3, isDeleted: false, category: ProductCategory.ELECTRONICS, isPremium: true};
	const orders: Order[] = [
		{
			creationDate: new Date('2024-01-01'),
			active: true,
			price: 100,
			orderLines: [
				{
					product: {id: 1, isDeleted: false, category: ProductCategory.ELECTRONICS, isPremium: true},
					itemCount: 10
				},
				{
					product: {id: 2, isDeleted: false, category: ProductCategory.ELECTRONICS, isPremium: true},
					itemCount: 10
				},
				{
					product: p3,
					itemCount: 10
				}
			]
		}
	];
	const products = streamWreck.getFrequentOrderedProducts(orders);
	expect(products).to.contain(p3);
});
