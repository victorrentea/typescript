import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {calculateOrderPrice} from "../src/SplitPhase2";
import {createMenu} from "../src/Destructuring";
import {Interval, IntervalInterface} from "../src/UtilsVsVO";


describe('ZA TEST', () => {
    it('should pass', () => {
        let config = { body: 'Bar' };
        createMenu(config);
        console.log("Outside, after", config);

        expect(true).to.be.true;
    });

    it('should pass2', () => {
        let interval = new Interval(1, 3);
        // let interval:IntervalInterface = {start:1, end:3};
        // const x = {start:1, end:3};
        // let interval:Interval = {...new Interval(1, 3), ...x};
        console.log(interval.intersects(new Interval(2, 4)));
    });


});
