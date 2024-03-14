import {Order} from "./FPmodel";


function totalOrderPrice(orders: Order[]): number {
    let sum: number = 0;
    orders.filter(order => order.active)
        .forEach(order => {
            sum += order.price;
        });
    return sum;
}

function getPlacedDates(orders: Order[]): Date[] {
    const placedDates: Date[] = [];
    orders.filter(order => order.active)
        .forEach(order => {
            if (order.creationDate) {
                placedDates.push(order.creationDate);
            }
        });
    return placedDates;
}