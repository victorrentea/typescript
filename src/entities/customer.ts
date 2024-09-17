import {MOVIE_CATEGORY} from "../VideoStore";
import {Rental} from "./rental";
import {Movie} from "./movie";

export class Customer {
    private rentals: Rental[] = [];

    constructor(private readonly name: string) {
        this.name = name;
    }

    public addRental(rental: Rental) {
        this.rentals.push(rental);
    }

    public statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        const resultStringArray = [`Rental Record for ${this.name}`];
        for (const rental of this.rentals) {
            // determine amounts for each line
            const thisAmount = rental.calculateRentPrice(rental);
            // add frequent renter points
            frequentRenterPoints += rental.calculateFrequentRenterPoints();
            // show figures line for this rental
            resultStringArray.push(`\t${rental.movie.title}\t${thisAmount.toFixed(1)}`);
            totalAmount += thisAmount;
        }
        // add footer lines
        // todo add text to array, use with replace
        resultStringArray.push(`Amount owed is ${totalAmount.toFixed(1)}`);
        resultStringArray.push(`You earned ${frequentRenterPoints} frequent renter points`);
        return resultStringArray.join('\n');
    }



}