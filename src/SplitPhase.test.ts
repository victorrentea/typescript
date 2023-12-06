import {expect} from 'chai';
import {describe, it} from 'mocha';
import {calculateOrderPrice} from "./SplitPhase";


it('SplitPhase', () => {
    const v = calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]]));
    console.log(v);
    expect(v).to.be.eq(20);
});
