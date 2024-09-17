import {Movie} from "./Movie";

export class EldersMovie extends Movie {
    calculateAmount(rentalDays: number): number {
        throw new Error("Method not implemented.");
    }

    calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number {
        throw new Error("Method not implemented.");
    }

}
export class ChildrensMovie extends Movie {
    constructor(title: string,
                public readonly pegi: number) {
        super(title);
    }

// if there are more than 3 methods like this
    // or the subclasses keep data that is not used in the parent class
    public calculateAmount(rentalDays: number): number {
        let amount = 1.5;
        if (rentalDays > 3) {
            amount += (rentalDays - 3) * 1.5;
        }
        return amount;
    }

    public canWatch(customerAge: number): boolean {
        return customerAge >= this.pegi;
    }

    calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number {
        return frequentRenterPoints + 1;
    }
}
