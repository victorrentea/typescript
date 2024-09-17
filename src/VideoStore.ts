export class Movie {
    public title: string;
    public priceCode: number;

    constructor(title: string, priceCode: number) {
        this.title = title;
        this.priceCode = priceCode;
    }
}


export const  movieCategory = {
    children : 2,
    regular : 0,
    newRelease :1
 }

const prices = {
    [movieCategory.regular]: {
        base: 2,
        extra: 1.5,
        limit: 2
    },
    [movieCategory.newRelease]: {
        base: 3,
        extra: 0,
        limit: 0
    },
    [movieCategory.children]: {
        base: 1.5,
        extra: 1.5,
        limit: 3
    }
}


export class Customer {
    private name: string;
    private rentals: any[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addRental(movie: Movie, day: number) {
        this.rentals.push({day: day, movie: movie});
    }

    public statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = "Rental Record for " + this.name + "\n";
        for (const rental of this.rentals) {
            const movie = rental.movie;
            const rentalDays = rental.day;
            let thisAmount = 0;
            // add frequent renter points
            frequentRenterPoints++;
            thisAmount = this.calculateMovieRentalPrice(movie, thisAmount, rentalDays);

            // add bonus for a two day new release rental
            if (movie.priceCode === movieCategory.newRelease && rentalDays > 1) {
                frequentRenterPoints++;
            }
            // show figures line for this rental
            result += "\t" + movie.title + "\t" + thisAmount.toFixed(1) + "\n";
            totalAmount += thisAmount;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

    private calculateMovieRentalPrice(movie: Movie, thisAmount: number, rentalDays: number) {
        // determine amounts for each line
        const price = prices[movie.priceCode];
        thisAmount += price.base * rentalDays;

        if (rentalDays > price.limit) {
            thisAmount += (rentalDays - price.limit) * price.extra;
        }
        return thisAmount;
    }
}

