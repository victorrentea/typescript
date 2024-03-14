import {expect} from "chai";

// Biz rule: customer name > 3 characters
class Customer {
    constructor(
        private _name: string,
        public readonly age: number
    ) {
        if (_name.length < 3) {
            throw new Error();
        }
    }
    get name() {
        return this._name;
    }
    set name(newName: string) {
        if (newName.length < 3) {
            throw new Error();
        }
    }
    get upperName() { //synthetic getter
        return this._name.toUpperCase();
    }

    func() {
        return 1;
    }
}

it("should throw calling new", () => {
    expect(() => new Customer("Bo", 20)).to.throw();
});

const customer = new Customer("John", 20);
customer.name = "Booool";
console.log(customer.name);
console.log(customer.upperName);
it("should throw setting attribute", () => {
    expect(() => customer.name = "Bo").to.throw();
});

customer.func(); // IDE can track reference to the invoked method

function functionCalledOnType(customer: Customer) {
    customer.func(); // IDE tracks called method
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function whyAnySucks(customer: any) {
    customer.func(); // IDE cannot track the invoked method
}
//
whyAnySucks(customer);
it("should throw runtime", () => {
    expect(() => whyAnySucks("string why not")).to.throw();
});
//
//

