function parse(orderString: string) {
    const orderData = orderString.split(/\s+/);
    const code = orderData[0].split("-")[1];
    const itemCount = Number(orderData[1]);
    const parsed = new ParsedOrderLine(code, itemCount);
    return parsed;
}

export function calculateOrderPrice(orderString:string,  priceList: Map<string, number>):number {
    const parsed = parse(orderString);

    const productPrice = priceList.get(parsed.code);
    const orderLine = new OrderLine(productPrice, parsed.itemCount);

    return orderLine.getPrice();
}
class ParsedOrderLine {
    constructor(public readonly code:string,
                public readonly itemCount:number) {
    }

}

class OrderLine {
    constructor(
        public readonly price: number,
        public readonly itemCount: number) {
    }
    public getPrice() {
        return this.price *  this.itemCount;
    }

}