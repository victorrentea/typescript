import {Movie} from "./movie";
import {MOVIE_CATEGORY} from "../VideoStore";
import {RentSummary} from "./rent-summary";

export class Rental {
    constructor(public movie: Movie, public daysRent: number) {
    }

    calculateFrequentRenterPoints() {
        // add bonus for a two day new release rental
        return this.movie.priceCode === MOVIE_CATEGORY.NEW_RELEASE && this.daysRent >= 2 ? 2 : 1
    }

    public calculatePrice(): number {
        let thisAmount = 0;
        switch (this.movie.priceCode) {
            case MOVIE_CATEGORY.REGULAR:
                thisAmount += 2;
                if (this.daysRent > 2)
                    thisAmount += (this.daysRent - 2) * 1.5;
                break;
            case MOVIE_CATEGORY.NEW_RELEASE:
                thisAmount += this.daysRent * 3;
                break;
            case MOVIE_CATEGORY.CHILDREN:
                thisAmount += 1.5;
                if (this.daysRent > 3)
                    thisAmount += (this.daysRent - 3) * 1.5;
                break;
        }
        return thisAmount;
    }

    public getSummary() : RentSummary {
        const price = this.calculatePrice();
        return {
            price,
            frequentRenterPoints: this.calculateFrequentRenterPoints(),
            textResult: `\t${this.movie.title}\t${price.toFixed(1)}` // statementLine?
        };
    }

}