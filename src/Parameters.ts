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
type CreateMenuConfig = {
    title: string,
    body?: string,
    cancellable?: boolean
}
export function createMenu({title, body="N/A", cancellable=false}: CreateMenuConfig) {
    console.log("Inside: ", title, body, cancellable);
}


it('parameters', () => {
    createMenu({title: "Bar", body: "Foo", cancellable: true});
    createMenu({title: "Bar", body: "Foo"});
    createMenu({title: "Bar"});
    expect(true).to.be.true;
});

