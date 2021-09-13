enum OrderStatus {
    DRAFT="DRAFT",
    PLACED="PLACED",
    SHIPPED="SHIPPED",
}
export class Order { // Aggregate Root ====== DDD
    public  id:number;
    private _orderLines: Array<OrderLine> = [];
    private _totalPrice: number = 0;
    private _status: OrderStatus;
    private _shipDate: Date;

    constructor(orderLines: Array<OrderLine>) {
        if (!orderLines || !orderLines.length) {
            throw new Error("Min 1 line");
        }

        // this._orderLines= new Array(...orderLines);
        // this._totalPrice = this.computeTotalPri// ce();

        // orderLines.forEach(line => this.addOrderLine(line));
        // orderLines.forEach(this.addOrderLine, this);
        for (const orderLine of orderLines) {
            this.addOrderLine(orderLine);
        }
    }
    get status(): OrderStatus {
        return this._status;
    }
    get shipDate(): Date {
        return this._shipDate;
    }

    public markAsShipped() { // incapsuleaza regula: poti face SHIP doar dupa PLACE, si date trebuie automat retinut
        if (this._status != OrderStatus.PLACED) {
            throw new Error("Can only ship a PLACED order");
        }
        this._status = OrderStatus.SHIPPED;
        this._shipDate = new Date();
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
            this._orderLines.splice(this._orderLines.findIndex(line => line.equals(existingLine)),1);
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
        if (this._orderLines.length == 1) {
            throw new Error("Macar o linie sa ramana");
        }
        this._orderLines.splice(this._orderLines.findIndex(line => line.equals(lineToRemove)),1);
        this._totalPrice = this.computeTotalPrice();
    }

}
export class OrderLine {// child Entity, part of the Order Aggregate
    constructor(public product: Product, public readonly count: number) {
        if (count <= 0) {
            throw new Error("Count must be > 0")
        }
        if (!product) {
            throw new Error("Product must be set");
        }
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


// to test:
function cancelOrder(order: Order)
{
    console.log("Sending email: order#"+order.id + " was cancelled");
}



class TestData { // Object Mother
    // public static aPlacedOrder(object: Object):Order {
    //     this.aValidOrder().place().ship();
    // }
    public static aValidOrder(object: Object):Order {
        let orderLine = new OrderLine(new Product("P1", 10), 2);
        return Object.assign(new Order([orderLine]), object);
    }
}

// TEST:
let order1 = TestData.aValidOrder({id:13/*, totalPrice:13*/});
cancelOrder(order1);
console.log(order1.totalPrice)



let orderLine = new OrderLine(new Product("P1", 10), 2);
let order = new Order([orderLine]);


let product = new Product("P2", 3);
orderLine = new  OrderLine(product, 3);
order.addOrderLine(orderLine);

// let vv: OrderLine = order.orderLines[0];
// vv.addCount(1);
order.addOrderLine(new OrderLine(product, 1));



console.log(order.totalPrice)


// order.orderLines.splice()