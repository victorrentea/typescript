type ProductRepo = {
    getHiddenProductIds(): number[];
};


function differenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
}

export class StreamWreck {
    constructor(private readonly productRepo: ProductRepo) {
    }

    public getFrequentOrderedProducts(orders: Order[]): Product[] {
		return Array.from(orders
			.filter(order => order.active)
			// filter orders that are less than a year old
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
			.filter(([product]) => !this.productRepo.getHiddenProductIds().includes(product.id))
			.map(([product]) => product);
	}
}