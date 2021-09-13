"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLine = exports.Order = void 0;
const File1_1 = require("./p1/File1");
class Order {
    constructor() {
    }
}
exports.Order = Order;
class OrderLine {
    constructor(product) {
        this.product = product;
    }
}
exports.OrderLine = OrderLine;
let orderLine = new OrderLine(new File1_1.Product("P1", 10));
orderLine.count = 2;
let order = new Order();
order.orderLines = [orderLine];
order.totalPrice = orderLine.product.price * orderLine.count;
orderLine = new OrderLine(new File1_1.Product("P2", 3));
orderLine.count = 3;
order.orderLines.push(orderLine);
order.totalPrice += orderLine.product.price * orderLine.count;
console.log(order.totalPrice);
