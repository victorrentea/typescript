import {it} from "mocha";
import {expect} from "chai";

function parseInput(orderString: string) {
    const [str, quantityStr] = orderString.split(/\s+/); // split by space
    const [, productCode] = str.split(/-/);
    const quantity = parseInt(quantityStr);
    return {productCode, quantity};
}

// for xample, orderString = "Chair-CHR 4" or "Table-TBL 2" or "Sofa-SFA 1"
export function calculateOrderPrice(orderString: string, priceList: Map<string, number>): number {
    const {productCode, quantity} = parseInput(orderString);

    const productPrice = priceList.get(productCode) ?? 0;
    return quantity * productPrice;
}


it('SplitPhase', () => {
    const v = calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]]));
    console.log(v);
    expect(v).to.be.eq(20);
});


// TODO
//  - security: use const regExpTest = new RegExp(/....../);
