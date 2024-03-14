import {it} from "mocha";
import {expect} from "chai";

export function calculateOrderPrice(orderString: string, priceList: Map<string, number>): number {
    const [str, quantity] = orderString.split(/\s+/);
    const [, productCode ]=  str.split(/-/);

    const productPrice = priceList.get(productCode);
    if (productPrice) {
        return parseInt(quantity) * productPrice;
    }
    return 0;
}


it('SplitPhase', () => {
    const v = calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]]));
    console.log(v);
    expect(v).to.be.eq(20);
});


// TODO
//  - security: use const regExpTest = new RegExp(/....../);
