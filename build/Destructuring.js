"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenu2 = exports.createMenu = void 0;
function m(x) {
    x.f();
}
function createMenu(config) {
    // NU:
    // config.title = config.title || 'Foo';
    // config.body = config.body || 'Bar';
    // config.buttonText = config.buttonText || 'Baz';
    // config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
    // let myConfig = Object.assign({
    //     title:"Foo",
    //     body:"Bar",
    //     buttonText:"Baz",
    //     cancellable: true
    // }, config);
    //
    try {
        let x;
        m(x);
    }
    catch (e) {
    }
    let myConfig = Object.assign({ title: "Foo", body: "Bar", buttonText: "Baz", cancellable: true }, config);
    console.log("Inside: ", myConfig);
}
exports.createMenu = createMenu;
function createMenu2({ title = 'Foo', body = 'BarDefault', buttonText = 'Baz', cancellable = true }) {
    console.log("Inside: ", title);
}
exports.createMenu2 = createMenu2;
