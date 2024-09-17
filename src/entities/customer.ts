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

        let result = `Rental Record for ${this.name}\n`;
        for (const rental of this.rentals) {
            // determine amounts for each line
            const thisAmount = this.calculateRentPrice(rental.movie, rental);
            // add frequent renter points
            // add bonus for a two day new release rental
            frequentRenterPoints += rental.calculateFrequentRenterPoints();
            // show figures line for this rental
            result += `\t${rental.movie.title}\t${thisAmount.toFixed(1)}\n`;
            totalAmount += thisAmount;
        }
        // add footer lines
        // todo add text to array, use with replace
        result += `Amount owed is ${totalAmount.toFixed(1)}\n`;
        result += `You earned ${frequentRenterPoints} frequent renter points`;
        return result;
    }



    private calculateRentPrice(movie: Movie, rental: Rental): number {
        let thisAmount = 0;
        switch (movie.priceCode) {
            case MOVIE_CATEGORY.REGULAR:
                thisAmount += 2;
                if (rental.daysRent > 2)
                    thisAmount += (rental.daysRent - 2) * 1.5;
                break;
            case MOVIE_CATEGORY.NEW_RELEASE:
                thisAmount += rental.daysRent * 3;
                break;
            case MOVIE_CATEGORY.CHILDREN:
                thisAmount += 1.5;
                if (rental.daysRent > 3)
                    thisAmount += (rental.daysRent - 3) * 1.5;
                break;
        }
        return thisAmount;
    }
}