import {expect} from 'chai';
import {it} from 'mocha';
import {createMenu, createMenu2} from "./Parameters";


it('parameters', () => {
    createMenu({ title: "Bar", body: "Foo" });
    createMenu2({ title: "Bar", body: "Foo" });
    // console.log("Outside, after", config);

    expect(true).to.be.true;
});

