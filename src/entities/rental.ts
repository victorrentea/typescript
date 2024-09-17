import {Movie} from "./movie";
import {MOVIE_CATEGORY} from "../VideoStore";

export class Rental {
    constructor(public movie: Movie, public daysRent: number) {
    }

    calculateFrequentRenterPoints() {
        // add bonus for a two day new release rental
        return this.movie.priceCode === MOVIE_CATEGORY.NEW_RELEASE && this.daysRent > 1 ? 2 : 1
    }

    public calculateRentPrice(rental: Rental): number {
        let thisAmount = 0;
        switch (rental.movie.priceCode) {
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