import {expect} from 'chai';
import {it} from 'mocha';
import {createMenu} from "./Parameters";


it('parameters', () => {
    createMenu("Bar", "Foo", false);
    // console.log("Outside, after", config);

    expect(true).to.be.true;
});
