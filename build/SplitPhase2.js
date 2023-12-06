"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(orderString) {
    let orderData = orderString.split(/\s+/);
    let code = orderData[0].split("-")[1];
    let itemCount = Number(orderData[1]);
    let parsed = new ParsedOrderLine(code, itemCount);
    return parsed;
}
function calculateOrderPrice(orderString, priceList) {
    let parsed = parse(orderString);
    let productPrice = priceList.get(parsed.code);
    let orderLine = new OrderLine(productPrice, parsed.itemCount);
    return orderLine.getPrice();
}
exports.calculateOrderPrice = calculateOrderPrice;
class ParsedOrderLine {
    constructor(code, itemCount) {
        this.code = code;
        this.itemCount = itemCount;
    }
}
class OrderLine {
    constructor(price, itemCount) {
        this.price = price;
        this.itemCount = itemCount;
    }
    getPrice() {
        return this.price * this.itemCount;
    }
}
