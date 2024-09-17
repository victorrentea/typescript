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

interface rental {
    movie: Movie,
    day: number
}

export class Customer {
    private readonly name: string;
    private rentals: rental[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addRental(rental: rental) {
        this.rentals.push(rental);
    }

    public createStatement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = "Rental Record for " + this.name + "\n";
        for (const rental of this.rentals) {
            const movie = rental.movie;
            const rentalDays = rental.day;
            // add frequent renter points
            frequentRenterPoints++;
            let rentalPrice = this.calculateMovieRentalPrice(movie, rentalDays);

            if (this.checkBonusPrivileged(movie, rentalDays)) {
                frequentRenterPoints++;
            }
            // show figures line for this rental
            result += "\t" + movie.title + "\t" + rentalPrice.toFixed(1) + "\n";
            totalAmount += rentalPrice;
        }
        // add footer lines
        return result + "Amount owed is " + totalAmount.toFixed(1) + "\nYou earned " + frequentRenterPoints + " frequent renter points";
    }

    private checkBonusPrivileged(movie: Movie, rentalDays: number) {
        return movie.priceCode === "newRelease" && rentalDays > 1;
    }

    private calculateMovieRentalPrice(movie: Movie, rentalDays: number) {

        const price = prices[movie.priceCode];
        let rentalPrice = price.base;

        if (rentalDays > price.limit) {
            rentalPrice += (rentalDays - price.limit) * price.extra;
        }
        return rentalPrice;
    }
}

