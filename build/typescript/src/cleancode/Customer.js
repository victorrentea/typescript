"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.Rental = void 0;
const Movie_1 = require("./Movie");
class Rental {
    constructor(movie, daysRented) {
        this.movie = movie;
        this.daysRented = daysRented;
    }
    computeRenterPoints() {
        let result = 1;
        let isNewRelease = this.movie.category == Movie_1.MovieCategory.NEW_RELEASE;
        if (isNewRelease && this.daysRented >= 2) {
            result++;
        }
        return result;
    }
    computePrice() {
        // let m : Map<MovieCategory, (a:number)=> number>;
        // const map = {
        //   [MovieCategory.REGULAR]:this.computeRegularPrice,
        //   [MovieCategory.NEW_RELEASE]:this.computeNewReleasePrice,
        //   [MovieCategory.CHILDREN]:this.computeChildrenPrice
        // };
        // return map[MovieCategory.REGULAR]();
        // for (let id of lista) {
        //   await getCustomer(id);
        // }
        // promise.all(lista.map(id=>getCustomer(id)))
        // let promise = getCustomer(id);
        // all(promise1,promis2..)
        switch (this.movie.category) {
            case Movie_1.MovieCategory.REGULAR: return this.computeRegularPrice();
            case Movie_1.MovieCategory.NEW_RELEASE: return this.computeNewReleasePrice();
            case Movie_1.MovieCategory.CHILDREN: return this.computeChildrenPrice();
            default: throw new Error("Unknown category: " + this.movie.category);
        }
    }
    computeChildrenPrice() {
        let result = 1.5;
        if (this.daysRented > 3)
            result += (this.daysRented - 3) * 1.5;
        return result;
    }
    computeNewReleasePrice() {
        return this.daysRented * 3;
    }
    computeRegularPrice() {
        let result = 2;
        if (this.daysRented > 2)
            result += (this.daysRented - 2) * 1.5;
        return result;
    }
}
exports.Rental = Rental;
class Customer {
    // private readonly rentals: Rental[] = [];
    // public readonly rentals: Rental[];
    constructor(name, rentals) {
        this.name = name;
        this.rentals = rentals;
        // this._rentals = Object.freeze(rentals);
    }
}
exports.Customer = Customer;
