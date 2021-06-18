import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {calculateOrderPrice} from "../src/SplitPhase2";


describe('The test environment', () => {
    it('should pass', () => {
        console.log(calculateOrderPrice("Chair-CHR 4", new Map([["CHR", 5]])));
        expect(true).to.be.true;
    });


});
