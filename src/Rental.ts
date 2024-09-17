import {Movie} from "./Movie";
import {MovieCategory} from "./MovieCategory";

const REGULAR_POINTS = 1;
const POINTS_WITH_BONUS = 2;

export class Rental {
    constructor(public movie: Movie, public readonly days: number) {
    }

    calculatePrice(): number {
        switch (this.movie.category) {
            case MovieCategory.REGULAR:
                return this.calculateRegularPrice();
            case MovieCategory.NEW_RELEASE:
                return this.days * 3;
            case MovieCategory.CHILDRENS:
                return this.calculateChildrenPrice();
            default:
                throw new Error("Unknown category");
        }
    }

    private calculateChildrenPrice() {
        let price = 1.5;
        if (this.days > 3)
            price += (this.days - 3) * 1.5;
        return price;
    }

    private calculateRegularPrice() {
        let price = 2;
        if (this.days > 2)
            price += (this.days - 2) * 1.5;
        return price;
    }

    public getFrequentRenterPoints() {
        if (this.movie.category == MovieCategory.NEW_RELEASE && this.days > 1) {
            return POINTS_WITH_BONUS;
        }
        return REGULAR_POINTS;
    }
}