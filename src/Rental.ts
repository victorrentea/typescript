import {Movie} from "./Movie";

export class Rental {
    constructor(public readonly movie: Movie,
                public readonly rentalDays: number) {
    }
}
