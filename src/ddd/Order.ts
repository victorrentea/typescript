export class Order {
    public totalPrice: number;
    public orderLines: Array<OrderLine>;
    constructor() {
    }
}
export class OrderLine {
    public count: number;
    constructor(public product: Product) {
    }
}

export class Product {
    public name: string;
    public description: string;
    constructor(public id : string, public price: number) {
    }

}


let orderLine = new OrderLine(new Product("P1", 10));
orderLine.count=2;
let order = new Order();
order.orderLines = [orderLine];
order.totalPrice = orderLine.product.price * orderLine.count;


orderLine = new  OrderLine(new Product("P2", 3))
orderLine.count = 3;
order.orderLines.push(orderLine);
order.totalPrice += orderLine.product.price * orderLine.count;

console.log(order.totalPrice)