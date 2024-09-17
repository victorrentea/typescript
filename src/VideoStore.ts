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
        let finalRentalPrice = 2;
        if (rentalDays > 2)
            finalRentalPrice += (rentalDays - 2) * 1.5;
        return finalRentalPrice;
    },
    [MOVIE_CATEGORY.NEW_RELEASE]: (rentalDays: number) => {
        return rentalDays * 3
    },
    [MOVIE_CATEGORY.CHILDREN]: (rentalDays: number) => {
        let finalRentalPrice = 1.5;
        if (rentalDays > 3)
            finalRentalPrice += (rentalDays - 3) * 1.5;
        return finalRentalPrice;
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

    private buildRentalReport(frequentRenterPoints: number): string {
        // let totalAmount = 0;
        // for (const rental of this.rentalReport) {
        //     totalAmount += rental.rentalPrice;
        // }
        let totalAmount = this.rentalReport
            .map(rental => rental.rentalPrice)
            .reduce((a, b) => a + b, 0);

        let result = "Rental Record for " + this.name + "\n";
        // for (const rental of this.rentalReport) {
        //     result += "\t" + rental.movieTitle + "\t" + rental.rentalPrice.toFixed(1) + "\n";
        // }
        result += this.rentalReport.map(this.buildLine).join("");
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

    private buildLine(rental: RentalReport) {
        return "\t" + rental.movieTitle + "\t" + rental.rentalPrice.toFixed(1) + "\n";
    }

    public statement(): string {


        for (const rental of this.rentals) {
            const currentRentalPrice = priceCalculator[rental.movie.priceCode](rental.rentalDays);
            this.rentalReport.push({movieTitle: rental.movie.title, rentalPrice: currentRentalPrice});
        }

        // let frequentRenterPoints = 0;
        // for (const rental of this.rentals) {
        //     frequentRenterPoints += this.calculateRenterPointsToAdd(rental.movie, rental.rentalDays);
        // }
        let frequentRenterPoints = this.rentals
            .map(rental => this.calculateRenterPointsToAdd(rental))
            .reduce((a, b) => a + b, 0);

        return this.buildRentalReport(frequentRenterPoints);
    }

    private calculateRenterPointsToAdd(rental: Rental) {
        let frequentRenterPoints = 1;
        const needToAddBonus = (rental.movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE) && rental.rentalDays > 1;
        return needToAddBonus ? frequentRenterPoints+1 : frequentRenterPoints;
        // return needToAddBonus ? 2 : 1;
    }
}
