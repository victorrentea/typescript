import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {calculateOrderPrice} from "../src/SplitPhase2";
import {createMenu} from "../src/DefaultParameters";


describe('ZA TEST', () => {
    it('should pass', () => {
        let config = { body: 'Bar' };
        createMenu(config);
        console.log("Outside, after", config);

        expect(true).to.be.true;
    });


});
