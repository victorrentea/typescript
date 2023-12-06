export class Customer{
    private _name:string;
    constructor(_name:string) {
        if (!_name) {
            throw new Error();
        }
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    set name(newName:string) {
        if (!newName) {
            throw new Error();
        }
        this._name = newName;
    }
    functzie () {
        return 1;
    }
}
const customer = new Customer("John");
customer.name="Altu";
customer.name=null;
const customer2 = new Customer(null);

customer.functzie();
function undevaDeparte( customer: Customer) {
    customer.functzie(); // BUN
}
// function deceanyArde( customer ) {
function deceanyArde( customer: any) {
    customer.functzie(); // RAU ca VSC nu subliniaza cu CTRL apasat
}
//clientu, saracu
deceanyArde(customer);
deceanyArde("string ca de ce nu"); // RAU WTF ?! ca obliga fct sa trateze tipuri

interface MyDtoPrimitDeLaServer {
    readonly a:string;
    readonly b:string;
}


let v:MyDtoPrimitDeLaServer;
// v.a="suprizA"; // does not compile