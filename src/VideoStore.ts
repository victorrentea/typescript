import {Movie} from "./Movie";
import {Rental} from "./Rental";

export class Customer {

    private rentals: Rental[] = [];

    constructor(public readonly name: string) {
        this.name = name;
    }

    public addRental(movie: Movie, rentalDays: number) {
        this.rentals.push(new Rental(movie, rentalDays));
    }

    public statement(): string {
        let result = "Rental Record for " + this.name + "\n";

        let frequentRenterPoints = 0;
        for (const rental of this.rentals) {
            frequentRenterPoints += rental.getFrequentRenterPoints();
        }

        let totalPrice: number = 0;
        for (const rental of this.rentals) {
            let price = rental.calculatePrice();
            result += "\t" + rental.movie.title + "\t" + price.toFixed(1) + "\n";
            totalPrice += price;
        }

        return result + this.buildMessage(totalPrice, frequentRenterPoints);
    }


    private buildMessage(totalPrice: number, frequentRenterPoints: number) {
        return `Amount owed is ${totalPrice.toFixed(1)}\nYou earned ${frequentRenterPoints} frequent renter points`;
    }
}
