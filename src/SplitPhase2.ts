function parse(orderString: string) {
    let orderData = orderString.split(/\s+/);
    let code = orderData[0].split("-")[1];
    let itemCount = Number(orderData[1]);
    let parsed = new ParsedOrderLine(code, itemCount);
    return parsed;
}

export function calculateOrderPrice(orderString:string,  priceList: Map<string, number>):number {
    let parsed = parse(orderString);

    let productPrice = priceList.get(parsed.code);
    let orderLine = new OrderLine(productPrice, parsed.itemCount);

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