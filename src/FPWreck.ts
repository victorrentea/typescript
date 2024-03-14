import {expect} from "chai";
import {Order, OrderLine, Product, ProductCategory} from "./FPmodel";

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
		const recentOrderLines = orders
			.filter(order => order.active)
			.filter(this.isRecent)
			.flatMap(order => order.orderLines);

		const productCounts = this.sumUpPurchasedProducts(recentOrderLines);
		// sumValuesByKeys(map, ol=>ol.product, ol=>ol.itemCount)

		const hiddenIds = await this.productApi.getHiddenProductIds();
		return Array.from(productCounts.entries())
			.filter(([, count]) => count >= 10)
			.map(([product]) => product)
			.filter(product => !product.isDeleted)
			// .filter(product => !this.productApi.getHiddenProductIds().includes(product.id))
			.filter(product => !hiddenIds.includes(product.id))
			;
	}

	private sumUpPurchasedProducts(recentOrderLines: OrderLine[]) {
		return recentOrderLines
			.reduce((productCountMap, orderLine) => {
				const oldCount = productCountMap.get(orderLine.product) || 0;
				productCountMap.set(orderLine.product, oldCount + orderLine.itemCount);
				return productCountMap;
			}, new Map<Product, number>());
	}

	private isRecent(order: Order) {
		return differenceInDays(new Date(), order.creationDate) < 365;
	}
}

it('should return frequent ordered products', () => {
	const productApi = {
		getHiddenProductIds: () => [1, 2]
	};
	const streamWreck = new FPWreck(productApi);
	const p3 = {id: 3, isDeleted: false, category: ProductCategory.ELECTRONICS, isPremium: true};
	let p1 = {id: 1, isDeleted: false, category: ProductCategory.ELECTRONICS, isPremium: true};
	const orders: Order[] = [
		{
			creationDate: new Date('2024-01-01'),
			active: true,
			price: 100,
			orderLines: [
				{
					product: p1,
					itemCount: 10
				},
				{
					product: p1,
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
