import {Movie} from "./Movie";

export class ChildrensMovie extends Movie {
    constructor(title: string) {
        super(title);
    }

    public calculateAmount(rentalDays: number): number {
        let amount = 1.5;
        if (rentalDays > 3) {
            amount += (rentalDays - 3) * 1.5;
        }
        return amount;
    }

    calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number {
        return frequentRenterPoints + 1;
    }
}
