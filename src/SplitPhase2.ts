export function calculateOrderPrice(orderString:string,  priceList: Map<string, number>):number {
    let orderData = orderString.split("\\s+");
    let productPrice = priceList.get(orderData[0].split("-")[1]);

    return Number(orderData[1]) * productPrice;
}

console.log(calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]])));
export class X {

}