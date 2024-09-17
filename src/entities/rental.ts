import {Movie} from "./movie";

export class Rental {
    constructor(public movie: Movie, public daysRent: number) {
    }
}