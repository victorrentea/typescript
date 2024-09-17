import {Movie} from "./Movie";

export class NewReleaseMovie extends Movie {
    constructor(title: string) {
        super(title);
    }

    public calculateAmount(rentalDays: number): number {
        return rentalDays * 3;
    }

    calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number {
        let newFrequentRenterPoints = frequentRenterPoints + 1;
        if (rentalDays > 1) {
          newFrequentRenterPoints++;
        }
        return newFrequentRenterPoints;
    }
}
