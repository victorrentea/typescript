import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/cleancode/game-runner';
import {calculateOrderPrice} from "../src/cleancode/SplitPhase2";


describe('The test environment', () => {
    it('should pass', () => {
        let v = calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]]));
        console.log(v);
        expect(v).to.be.eq(20);
    });


});
