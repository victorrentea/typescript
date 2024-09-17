import {Movie} from "./Movie";

export class Rental {
    constructor(public movie: Movie, public readonly days: number) {
        this.movie = movie;
        this.days = days;
    }
}