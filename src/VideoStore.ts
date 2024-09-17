import {Movie} from "./Movie";
import {MovieCategory} from "./MovieCategory";
import {Rental} from "./Rental";

export class Customer {

    private rentals: Rental[] = [];

    constructor(public readonly name: string) {
        this.name = name;
    }

    public addRental(movie: Movie, rentalDays: number) {
        this.rentals.push(new Rental(movie, rentalDays));
    }

    public statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = "Rental Record for " + this.name + "\n";
        for (const rental of this.rentals) {
            let each = rental.movie;
            let thisAmount = 0;
            let dr = rental.days;
            // determine amounts for each line
            switch (each.priceCode) {
                case MovieCategory.REGULAR:
                    thisAmount += 2;
                    if (dr > 2)
                        thisAmount += (dr - 2) * 1.5;
                    break;
                case MovieCategory.NEW_RELEASE:
                    thisAmount += dr * 3;
                    break;
                case MovieCategory.CHILDRENS:
                    thisAmount += 1.5;
                    if (dr > 3)
                        thisAmount += (dr - 3) * 1.5;
                    break;
            }
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            if (each.priceCode != null &&
                (each.priceCode == MovieCategory.NEW_RELEASE)
                && dr > 1)
                frequentRenterPoints++;
            // show figures line for this rental
            result += "\t" + each.title + "\t" + thisAmount.toFixed(1) + "\n";
            totalAmount += thisAmount;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }
}
