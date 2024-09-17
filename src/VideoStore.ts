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

    addRental(movie: Movie, day: number) {
        this.rentals.push({movie, day});
    }

    public createStatement(): string {
        let totalAmount: number = 0;
        let frequentPoints = 0;
        let result = "Rental Record for " + this.name + "\n";

        for (const rental of this.rentals) {
            const {movie, day :rentalDays} = rental;

            const rentalPrice = calculateMovieRentalPrice(movie, rentalDays);
            frequentPoints += addFrequentRenterPoints(movie, rentalDays);

            result += "\t" + movie.title + "\t" + rentalPrice.toFixed(1) + "\n";
            totalAmount += rentalPrice;
        }
        return result + "Amount owed is " + totalAmount.toFixed(1) + "\nYou earned " + frequentPoints + " frequent renter points";
    }
}


function addFrequentRenterPoints(movie: Movie, rentalDays:number) {
    return checkBonusPrivileged(movie, rentalDays) ? 2 : 1;
}

function checkBonusPrivileged(movie: Movie, rentalDays: number) {
    return movie.priceCode === "newRelease" && rentalDays > 1;
}

function calculateMovieRentalPrice(movie: Movie, rentalDays: number) {

    const price = prices[movie.priceCode];
    let rentalPrice = price.base;

    if (rentalDays > price.limit) {
        rentalPrice += (rentalDays - price.limit) * price.extra;
    }
    return rentalPrice;
}

