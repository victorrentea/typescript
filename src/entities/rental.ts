import {Movie} from "./movie";
import {MOVIE_CATEGORY} from "../VideoStore";
import {RentSummary} from "./rent-summary";

export class Rental {
    constructor(public movie: Movie, public daysRent: number) {
    }

    calculateFrequentRenterPoints() {
        // add bonus for a two day new release rental
        return this.movie.priceCode === MOVIE_CATEGORY.NEW_RELEASE && this.daysRent > 1 ? 2 : 1
    }

    public calculatePrice(): number {
        switch (this.movie.priceCode) {
            case MOVIE_CATEGORY.REGULAR:
                return (this.daysRent > 2) ? 2 + (this.daysRent - 2) * 1.5 : 2;
            case MOVIE_CATEGORY.NEW_RELEASE:
                return  this.daysRent * 3;
            case MOVIE_CATEGORY.CHILDREN:
                return (this.daysRent > 3) ? 1.5 + (this.daysRent - 3) * 1.5 : 1.5;
            default:
                throw new Error("Unknown price code");
        }
    }

    public getSummary() : RentSummary {
        const price = this.calculatePrice();
        return {
            price,
            frequentRenterPoints: this.calculateFrequentRenterPoints(),
            textResult: `\t${this.movie.title}\t${price.toFixed(1)}`
        };
    }

}