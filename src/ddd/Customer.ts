

export class EmailAddress {
    constructor(public readonly value:string) {
        // if !value.includes("@")
    }
}
export class Customer {
    public email: EmailAddress;
}

function f(email:EmailAddress, p:string, q:string) {

}
let customer = new Customer();
f( customer.email, "x","b");

