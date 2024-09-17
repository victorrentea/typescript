export class Movie {
    constructor(public title: string, public priceCode: PriceCode) {
    }
}

type PriceCode = "children" | "regular" | "newRelease";

interface Price {
    base: number;
    extra: number;
    limit: number;
}

const prices: Record<PriceCode, Price> = {
    children: {base: 1.5, extra: 1.5, limit: 3},
    regular: {base: 2, extra: 1.5, limit: 2},
    newRelease: {base: 0, extra: 3, limit: 0}
};

export class Customer {
    private readonly name: string;
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
            // add frequent renter points
            frequentRenterPoints++;
            let thisAmount = this.calculateMovieRentalPrice(movie, rentalDays);

            if (this.checkBonusPrivileged(movie, rentalDays)) {
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

    private checkBonusPrivileged(movie: Movie, rentalDays: number) {
        return movie.priceCode === "newRelease" && rentalDays > 1;
    }

    private calculateMovieRentalPrice(movie: Movie, rentalDays: number) {
        // determine amounts for each line
        const price = prices[movie.priceCode];
        let thisAmount = price.base;

        if (rentalDays > price.limit) {
            thisAmount += (rentalDays - price.limit) * price.extra;
        }
        return thisAmount;
    }
}

