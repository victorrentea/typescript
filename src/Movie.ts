import {MOVIE_CATEGORY} from "./constants";
import {Rental} from "./VideoStore";

export class Movie {
    public title: string = "";
    public priceCode: number = 1;

    constructor(title: string, priceCode: number) {
        this.title = title;
        this.priceCode = priceCode;
    }

    // public calculateRentalAmount(numberOfDays: number): number {
    //     let currentAmount = 0;
    //     switch (this.priceCode) {
    //         case MOVIE_CATEGORY.REGULAR:
    //             currentAmount += 2;
    //             if (numberOfDays > 2)
    //                 currentAmount += (numberOfDays - 2) * 1.5;
    //             break;
    //         case MOVIE_CATEGORY.NEW_RELEASE:
    //             currentAmount += numberOfDays * 3;
    //             break;
    //         case MOVIE_CATEGORY.CHILDRENS:
    //             currentAmount += 1.5;
    //             if (numberOfDays > 3)
    //                 currentAmount += (numberOfDays - 3) * 1.5;
    //             break;
    //     }
    //     return currentAmount;
    // }
    //
    // public calculateRenterFrequentPoints(numberOfDays: number): number {
    //     let frequentRenterPoints=1;
    //     if (this.priceCode != null &&
    //         (this.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
    //         && numberOfDays > 1)
    //         frequentRenterPoints++;
    //     return frequentRenterPoints;
    // }


}
export function calculateRentalAmount(rental:Rental): number {
    let currentAmount = 0;
    switch (rental.movie.priceCode) {
        case MOVIE_CATEGORY.REGULAR:
            currentAmount += 2;
            if (rental.numberOfDays > 2)
                currentAmount += (rental.numberOfDays - 2) * 1.5;
            break;
        case MOVIE_CATEGORY.NEW_RELEASE:
            currentAmount += rental.numberOfDays * 3;
            break;
        case MOVIE_CATEGORY.CHILDRENS:
            currentAmount += 1.5;
            if (rental.numberOfDays > 3)
                currentAmount += (rental.numberOfDays - 3) * 1.5;
            break;
    }
    return currentAmount;
}

export function  calculateRenterFrequentPoints(movieRental:Rental): number {
    let frequentRenterPoints=1;
    if (movieRental.movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE && movieRental.numberOfDays > 1)
        frequentRenterPoints++;
    return frequentRenterPoints;
}
