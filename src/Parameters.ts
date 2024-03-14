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

export function createMenu(title: string, body: string, cancellable?: boolean) {
    cancellable = cancellable || false;
    console.log("Inside: ", title, body, cancellable);
}


it('parameters', () => {
    createMenu("Bar", "Foo", true);
    createMenu("Bar", "Foo");
    expect(true).to.be.true;
});

