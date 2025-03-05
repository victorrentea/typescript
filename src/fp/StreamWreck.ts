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
    const map = new Map<Product, number>();
    orders
      .filter(order => order.active)
      .filter(order => this.lessThanAYearOld(order))
      .flatMap(order => order.orderLines)
      .forEach(orderLine => {
        const product = orderLine.product;
        const oldCount = map.get(product) || 0;
        map.set(product, oldCount + orderLine.itemCount);
      });
    const hiddenProductIds = this.productRepo.getHiddenProductIds(); // 1 call, not N calls to DB
    return Array.from(map.entries())
      .filter(([product, count]) => count >= 10)
      .map(([product]) => product)
      .filter(product => !product.isDeleted)
      .filter(product => !hiddenProductIds.includes(product.id));

    // for (...) {
    // 	this.productRepo.getHiddenProductIds()
    // }
  }

  private lessThanAYearOld(order: Order): boolean {
    return differenceInDays(new Date(), order.creationDate) < 365;
  }
}