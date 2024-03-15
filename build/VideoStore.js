"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Movie {
}
exports.Movie = Movie;
exports.MOVIE_CATEGORY = {
    CHILDRENS: 2,
    REGULAR: 0,
    NEW_RELEASE: 1
};
class Customer {
    constructor(name) {
        this.rentals = [];
        this.name = name;
    }
    addRental(m, d) {
        this.rentals.push({ d: d, m: m });
    }
    statement() {
        let totalAmount = 0;
        let frequentRenterPoints = 0;
        let result = "Rental Record for " + this.name + "\n";
        for (const r of this.rentals) {
            let each = r.m;
            let thisAmount = 0;
            let dr = r.d;
            // determine amounts for each line
            switch (each.movieCategory) {
                case exports.MOVIE_CATEGORY.REGULAR:
                    thisAmount += 2;
                    if (dr > 2)
                        thisAmount += (dr - 2) * 1.5;
                    break;
                case exports.MOVIE_CATEGORY.NEW_RELEASE:
                    thisAmount += dr * 3;
                    break;
                case exports.MOVIE_CATEGORY.CHILDRENS:
                    thisAmount += 1.5;
                    if (dr > 3)
                        thisAmount += (dr - 3) * 1.5;
                    break;
            }
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            if (each.movieCategory != null &&
                (each.movieCategory == exports.MOVIE_CATEGORY.NEW_RELEASE)
                && dr > 1)
                frequentRenterPoints++;
            // show figures line for this rental
            result += "\t" + each.title + "\t" + thisAmount.toFixed(1) + "\n";
            totalAmount += thisAmount;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }
}
exports.Customer = Customer;
