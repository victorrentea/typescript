import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/cleancode/game-runner';

describe('The test environment', () => {
    it('should pass', () => {
        console.log(f());
        let arr = [];
        const functie = e => {};
        // arr.forEach(e => {
        //
        // });
        arr.forEach(e=>e.faCeva())
        let altaLista = arr.map(e=>e.ceva).reduce((a,b)=>a+b, 0);
        for (let e of arr) {
            e.x = 1;
        }
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

});

function f(): number {
    return null;
}
