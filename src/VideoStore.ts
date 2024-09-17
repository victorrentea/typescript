type Movie = {
    title: string;
    priceCode: number;
};

type Rental = {
    days: number;
    movie: Movie;
};

export const MOVIE_CATEGORY = {
    CHILDRENS: 2,
    REGULAR: 0,
    NEW_RELEASE: 1
};


export class Customer {
    private name: string;
    private rentals: Rental[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addRental(movie: Movie, days: number) {
        this.rentals.push({days: days, movie: movie});
    }

    public statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = "Rental Record for " + this.name + "\n";
        for (const rental of this.rentals) {
            const currentMovie = rental.movie;
            const numberOfRentedDays = rental.days;
            // determine amounts for each line
            const moviePrice = this.calculatePrice(currentMovie, numberOfRentedDays);
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            frequentRenterPoints = this.AddBonus(currentMovie, numberOfRentedDays, frequentRenterPoints);
            // show figures line for this rental
            result += "\t" + currentMovie.title + "\t" + moviePrice.toFixed(1) + "\n";
            totalAmount += moviePrice;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

    private AddBonus(currentMovie: Movie, numberOfRentedDays: number, frequentRenterPoints: number) {
        if (currentMovie.priceCode == MOVIE_CATEGORY.NEW_RELEASE
            && numberOfRentedDays > 1) {
            frequentRenterPoints++;
        }
        return frequentRenterPoints;
    }

    private calculatePrice(currentMovie: Movie, numberOfRentedDays: number) {
        let moviePrice = 0;
        switch (currentMovie.priceCode) {
            case MOVIE_CATEGORY.REGULAR:
                moviePrice += 2;
                if (numberOfRentedDays > 2)
                    moviePrice += (numberOfRentedDays - 2) * 1.5;
                break;
            case MOVIE_CATEGORY.NEW_RELEASE:
                moviePrice += numberOfRentedDays * 3;
                break;
            case MOVIE_CATEGORY.CHILDRENS:
                moviePrice += 1.5;
                if (numberOfRentedDays > 3)
                    moviePrice += (numberOfRentedDays - 3) * 1.5;
                break;
        }
        return moviePrice;
    }
}
