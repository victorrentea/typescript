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
        const moviePrices = this.rentals.map(rental => (
            {
                moviePrice: this.calculatePrice(rental.movie, rental.days),
                movieTitle: rental.movie.title
            }));
        const totalAmount = moviePrices.reduce((sum, {moviePrice}) => sum + moviePrice, 0);
        let result: string = moviePrices
            .reduce((sum, {
                moviePrice,
                movieTitle
            }) => `${sum}\t${movieTitle}\t${moviePrice.toFixed(1)}\n`, `Rental Record for ${this.name}\n`);

        const frequentRenterPoints = this.rentals
            .reduce((sum, currentMovie) => sum + this.calculateBonus(currentMovie.movie.priceCode, currentMovie.days) + 1, 0);

        return `${result}Amount owed is ${totalAmount.toFixed(1)}\nYou earned ${frequentRenterPoints} frequent renter points`;

    }

    private calculateBonus(priceCode: PriceCode, numberOfRentedDays: number) {
        return priceCode == PriceCode.NEW_RELEASE && numberOfRentedDays > 1 ? 1 : 0;
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
