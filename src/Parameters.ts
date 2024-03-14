// TODO set defaults to the params
//  - ||
//  - ??
//  - group {params} + defaults
//  - type
//  - config.title = config.title ||
//  - Object.assign(defaults, param)
//  - {defaults, ...spread}
//  - explore tuples: let marks:[number, number] = [1, 2]; // tuple of 2 number values

import {it} from "mocha";
import {expect} from "chai";

export function createMenu(cancellable: boolean, title: string, body: string) {
    console.log("Inside: ", title, body, cancellable);
}


it('parameters', () => {
    createMenu(false, "Bar", "Foo");
    // console.log("Outside, after", config);

    expect(true).to.be.true;
});

