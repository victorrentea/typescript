export function calculateOrderPrice(orderString: string, priceList: Map<string, number>): number {
    const [str, quantity] = orderString.split(/\s+/);
    const [, productCode ]=  str.split(/-/);

    const productPrice = priceList.get(productCode);
    if (productPrice) {
        return parseInt(quantity) * productPrice;
    }
    return 0;
}


console.log(calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]])));


// TODO
//  - security: use const regExpTest = new RegExp(/....../);
