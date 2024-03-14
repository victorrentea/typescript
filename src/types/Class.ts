import {expect} from "chai";

export class Customer {
    private _name: string;

    constructor(_name: string) {
        if (_name.trim().length < 3) { // guard
            throw new Error();
        }
        this._name = _name;
    }

    get name() { // getter
        return this._name;
    }

    set name(newName: string) { // setter
        if (newName.trim().length < 3) { // guard
            throw new Error();
        }
        this._name = newName;
    }

    func() {
        return 1;
    }
}

it("should throw calling new", () => {
    expect(() => new Customer("Bo")).to.throw();
});

const customer = new Customer("John");
customer.name = "Altu";
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

whyAnySucks(customer);
it("should throw runtime", () => {
    expect(() => whyAnySucks("string why not")).to.throw();
});




interface MyDtoFromServer {
    readonly name: string;
    readonly age: number;
}