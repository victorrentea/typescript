"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
class X {
    constructor(_list) {
        this._list = _list;
    }
    get list() {
        return this._list;
    }
}
exports.X = X;
let x = new X(["a", "b", "c", "d"]);
// x.list.splice(1,1);
for (let string of x.list) {
    console.log(string);
}
