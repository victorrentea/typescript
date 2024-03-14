import {Order} from "./FPmodel";


function totalOrderPrice(orders: Order[]): number {
    // should fail code review
    // let sum: number = 0;
    // orders.filter(order => order.active)
    //     .forEach(order => {
    //         sum += order.price;
    //     });
    // if you can avoid forEach by using some array method, do IT!!

    return orders.filter(order => order.active)
        .reduce((sum, order) => sum + order.price, 0);
}





function getPlacedDates(orders: Order[]): Date[] {
    // const placedDates: Date[] = [];
    // orders.filter(order => order.active)
    //     .forEach(order => {
    //         if (order.creationDate) {
    //             placedDates.push(order.creationDate);
    //         }
    //     });
    // return placedDates;
    return orders.filter(order => order.active)
        .map(order => order.creationDate)
        .filter(creationDate => creationDate !== null) as Date[];
}