export class Customer{
    private _name:string;
    constructor(_name:string) {
        // if (!_name) {
        //     throw new Error();
        // }
        this.name = _name;
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

}
let customer = new Customer("John");


customer.name="Altu";
customer.name=null;
let customer2 = new Customer(null);
// let customer3 = new Customer();



interface MyDtoPrimitDeLaServer {
    readonly a:string;
    readonly b:string;
}


let v:MyDtoPrimitDeLaServer;
// v.a="suprizA";