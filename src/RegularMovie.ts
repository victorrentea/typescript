import {Movie} from "./Movie";

export class RegularMovie extends Movie {
    constructor(title: string) {
        super(title);
    }

    public calculateAmount(rentalDays: number): number {
        let amount = 2;
        if (rentalDays > 2) {
            amount += (rentalDays - 2) * 1.5;
        }
        return amount;
    }

    calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number {
        return frequentRenterPoints + 1;
    }


}
