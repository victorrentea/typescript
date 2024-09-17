export enum PriceCode {
    CHILDRENS,
    REGULAR,
    NEW_RELEASE
}

type Movie = {
    title: string;
    priceCode: PriceCode;
};

type Rental = {
    days: number;
    movie: Movie;
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
        let frequentRenterPoints = 0;
        const moviePrices = this.rentals.map(rental => (
            {
                moviePrice: this.calculatePrice(rental.movie, rental.days),
                movieTitle: rental.movie.title
            }));
        const totalAmount = moviePrices.reduce((sum, {moviePrice}) => sum + moviePrice, 0);
        let result : string = moviePrices
            .reduce((sum, {
                moviePrice,
                movieTitle
            }) => `${sum}\t${movieTitle}\t${moviePrice.toFixed(1)}\n`, `Rental Record for ${this.name}\n`);

        for (const rental of this.rentals) {
            const currentMovie = rental.movie;
            const numberOfRentedDays = rental.days;
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            frequentRenterPoints += this.calculateBonus(currentMovie, numberOfRentedDays);
        }
        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

    private calculateBonus(currentMovie: Movie, numberOfRentedDays: number) {
        if (currentMovie.priceCode == PriceCode.NEW_RELEASE && numberOfRentedDays > 1) {
            return 1;
        }
        return 0;
    }

    private calculatePrice(currentMovie: Movie, numberOfRentedDays: number): number {
        const priceCodeMap = {
            [PriceCode.REGULAR]: this.calculateRegularMoviePrice,
            [PriceCode.NEW_RELEASE]: this.calculateNewReleaseMoviePrice,
            [PriceCode.CHILDRENS]: this.calculateChildrenMoviePrice
        }
        return priceCodeMap[currentMovie.priceCode](numberOfRentedDays);
    }

    private calculateNewReleaseMoviePrice(numberOfRentedDays: number) {
        return numberOfRentedDays * 3;
    }

    private calculateChildrenMoviePrice(numberOfRentedDays: number) {
        const moviePrice = 1.5;
        return numberOfRentedDays > 3 ? moviePrice + (numberOfRentedDays - 3) * 1.5 : moviePrice;
    }

    private calculateRegularMoviePrice(numberOfRentedDays: number) {
        const moviePrice = 2;
        return numberOfRentedDays > 2 ? moviePrice + (numberOfRentedDays - 2) * 1.5 : moviePrice;
    }
}
