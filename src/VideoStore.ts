export enum PriceCode {
    CHILDRENS ,
    REGULAR ,
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
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = `Rental Record for ${this.name}\n`;
        // this.rentals.
        for (const rental of this.rentals) {
            const currentMovie = rental.movie;
            const numberOfRentedDays = rental.days;
            // determine amounts for each line
            const moviePrice = this.calculatePrice(currentMovie, numberOfRentedDays);
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            frequentRenterPoints += this.calculateBonus(currentMovie, numberOfRentedDays);
            // show figures line for this rental
            result += `\t${currentMovie.title}\t${moviePrice.toFixed(1)}\n`;
            totalAmount += moviePrice;
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

    private calculatePrice(currentMovie: Movie, numberOfRentedDays: number) : number {
        let moviePrice = 0;
        switch (currentMovie.priceCode) {
            case PriceCode.REGULAR:
                moviePrice += 2;
                if (numberOfRentedDays > 2)
                    moviePrice += (numberOfRentedDays - 2) * 1.5;
                break;
            case PriceCode.NEW_RELEASE:
                moviePrice += numberOfRentedDays * 3;
                break;
            case PriceCode.CHILDRENS:
                moviePrice += 1.5;
                if (numberOfRentedDays > 3)
                    moviePrice += (numberOfRentedDays - 3) * 1.5;
                break;
        }
        return moviePrice;
    }
}
