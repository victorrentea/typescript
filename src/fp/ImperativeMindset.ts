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
    // misuse of =>
    // let sum: number = 0;
    // orders.filter(order => order.active)
    //     .forEach(order => {
    //         sum += order.price; // mutation
    //     });
    // return sum;

    const sum = (a: number, b: number) => a + b;
    return orders
      .filter(order => order.active)
      .map(order => order.price)
      .reduce(sum);

    // return orders
    //   .filter(order => order.active)
    //   .map(order => order.price)
    //   .reduce((a, b)=> a + b);

    // return orders
    //   .filter(order => order.active)
    //   .reduce((sum,order)=> sum + order.price, 0);

    // return orders
    //   .reduce((sum,order)=> sum + (order.active ? order.price : 0), 0);
}

function getShipDates(orders: Order[]): Date[] {
    // misuse of FP
    // const shipDates: Date[] = [];
    // orders.filter(order => order.active)
    //     .forEach(order => {
    //         if (order.shipDate) {
    //             shipDates.push(order.shipDate);
    //         }
    //     });
    // return shipDates;

    // return orders.filter(order => order.active && order.shipDate)
    //   .map(order => order.shipDate);

    // return orders
    //   .filter(order => order.active)
    //   .filter(order => order.shipDate)
    //   .map(order => order.shipDate);

    return orders
      .filter(order => order.active)
      .map(order => order.shipDate)
      .filter(date => date);
}