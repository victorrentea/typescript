type Order = {
    creationDate: Date;
    active: boolean;
    price: number;
    shipDate: Date;
    orderLines: OrderLine[];
}
type OrderLine = {
    product: Product;
    itemCount: number;
}

function totalOrderPrice(orders: Order[]): number {
    let sum: number = 0;
    orders.filter(order => order.active)
        .forEach(order => {
            sum += order.price;
        });
    return sum;
}

function getShipDates(orders: Order[]): Date[] {
    const shipDates: Date[] = [];
    orders.filter(order => order.active)
        .forEach(order => {
            if (order.shipDate) {
                shipDates.push(order.shipDate);
            }
        });
    return shipDates;
}