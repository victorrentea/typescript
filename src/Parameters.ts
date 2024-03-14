// TODO set defaults to the params
//  - ||
//  - ??
//  - group {params} + defaults
//  - type
//  - config.title = config.title ||
//  - Object.assign(defaults, param)
//  - {defaults, ...spread}
//  - ({title = 'Foo', ..}:MenuConfig) and MenuConfig = {title?: string, body?: string, cancellable?: boolean}

import {it} from "mocha";
import {expect} from "chai";

export function createMenu(cancellable: boolean, title: string, body: string) {
    console.log("Inside: ", title, body, cancellable);
}


it('parameters', () => {
    createMenu(false, "Bar", "Foo");
    expect(true).to.be.true;
});

