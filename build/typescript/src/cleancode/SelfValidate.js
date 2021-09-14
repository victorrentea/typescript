"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(_name) {
        // if (!_name) {
        //     throw new Error();
        // }
        this.name = _name;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        if (!newName) {
            throw new Error();
        }
        this._name = newName;
    }
}
exports.Customer = Customer;
let customer = new Customer("John");
customer.name = "Altu";
customer.name = null;
let customer2 = new Customer(null);
let v;
// v.a="suprizA";
