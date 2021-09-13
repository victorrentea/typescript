export class Order { // Aggregate Root ====== DDD
    private _orderLines: Array<OrderLine> = [];
    private _totalPrice: number = 0;
    constructor() {
        // this.orderLines.reduce((acc, line) => acc+line.price, 0);
    }

    get orderLines(): ReadonlyArray<OrderLine> {
        return this._orderLines;
    }
    get totalPrice(): number {
        return this._totalPrice;
    }

    public addOrderLine(lineToAdd: OrderLine) {
        let existingLine = this._orderLines.find(line => line.product.equals(lineToAdd.product));
        if (existingLine) {
            this.removeOrderLine(existingLine);
            let newCount = lineToAdd.count + existingLine.count;
            this.addOrderLine(new OrderLine(lineToAdd.product, newCount));
        } else {
            this._orderLines.push(lineToAdd);
        }
        this._totalPrice = this.computeTotalPrice();
    }

    private computeTotalPrice() {
        return this._orderLines.reduce((acc, line) => acc + line.price, 0);
    }

    public removeOrderLine(lineToRemove: OrderLine) {
        this._orderLines.splice(this._orderLines.findIndex(line => line.equals(lineToRemove)),1);
        this._totalPrice = this.computeTotalPrice();
    }

}
export class OrderLine {// child Entity, part of the Order Aggregate
    constructor(public product: Product, public readonly count: number) {
    }
    get price() { // pure function
        return this.count * this.product.price;
    }

    public equals(other: OrderLine) {
        return other.count === this.count &&
            other.product.equals(this.product);
    }
}

// export class OrderLineVO {
//     constructor(public readonly product: Product, public readonly count: number) {
//     }
// }

export class Product {
    public name: string;
    public description: string;
    constructor(public id : string, public price: number) {
    }

    equals(other: Product) { // TODO
        return true;
    }
}


let orderLine = new OrderLine(new Product("P1", 10), 2);
let order = new Order();

order.addOrderLine(orderLine);


let product = new Product("P2", 3);
orderLine = new  OrderLine(product, 3)
order.addOrderLine(orderLine);

// let vv: OrderLine = order.orderLines[0];
// vv.addCount(1);
order.addOrderLine(new OrderLine(product, 1));

console.log(order.totalPrice)


// order.orderLines.splice()