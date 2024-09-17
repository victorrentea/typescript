export interface Movie {
    title: string;
    priceCode: number;
}

export interface Rental {
    movie: Movie;
    rentalDays: number;
}

export interface RentalReport {
    movieTitle: string;
    rentalPrice: number;
}

export const MOVIE_CATEGORY = {
    REGULAR: 0,
    NEW_RELEASE: 1,
    CHILDREN: 2
};

const priceCalculator = {
    [MOVIE_CATEGORY.REGULAR]: (rentalDays: number) => {
        // let finalRentalPrice = 2;
        // if (rentalDays > 2)
        //     finalRentalPrice += (rentalDays - 2) * 1.5;
        // return finalRentalPrice;

        return (rentalDays > 2) ? 2 + (rentalDays - 2) * 1.5 : 2;
    },
    [MOVIE_CATEGORY.NEW_RELEASE]: (rentalDays: number) => {
        return rentalDays * 3
    },
    [MOVIE_CATEGORY.CHILDREN]: (rentalDays: number) => {
        let finalRentalPrice = 1.5;
        if (rentalDays > 3)
            finalRentalPrice += (rentalDays - 3) * 1.5;
        return finalRentalPrice;

        // return (rentalDays > 3) ? 1.5 + (rentalDays - 3) * 1.5 : 1.5;
    }
}


export class Customer {
    private readonly name: string;
    private rentals: Rental[] = [];
    private rentalReport : RentalReport[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addRental(rentalMovie: Rental) {
        this.rentals.push(rentalMovie);
    }
    public buildRentalReport(totalAmount: number, frequentRenterPoints: number): string {
        let result = "Rental Record for " + this.name + "\n";
        this.rentalReport.forEach((rental) => {
            result += "\t" + rental.movieTitle + "\t" + rental.rentalPrice.toFixed(1) + "\n";
        });
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

    public statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        for (const rental of this.rentals) {
            let currentMovie = rental.movie;
            const currentRentalPrice = priceCalculator[currentMovie.priceCode](rental.rentalDays);
            frequentRenterPoints += this.calculateRenterPointsToAdd(currentMovie, rental.rentalDays);
            this.rentalReport.push({movieTitle: currentMovie.title, rentalPrice: currentRentalPrice});
            totalAmount += currentRentalPrice;
        }

        return this.buildRentalReport(totalAmount, frequentRenterPoints);
    }

    private calculateRenterPointsToAdd(currentMovie: Movie, rentalDays: number) {
        let frequentRenterPoints = 1;
        const needToAddBonus = (currentMovie.priceCode == MOVIE_CATEGORY.NEW_RELEASE) && rentalDays > 1;
        return needToAddBonus ? frequentRenterPoints+1 : frequentRenterPoints;
        // return needToAddBonus ? 2 : 1;
    }
}
