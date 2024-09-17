import {Movie} from "./movie";
import {MOVIE_CATEGORY} from "../VideoStore";

export class Rental {
    constructor(public movie: Movie, public daysRent: number) {
    }

    calculateFrequentRenterPoints() {
        return this.movie.priceCode === MOVIE_CATEGORY.NEW_RELEASE && this.daysRent > 1 ? 2 : 1
    }
}