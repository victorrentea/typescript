import {Rental} from "./VideoStore";
import {calculateRentalAmount, calculateRenterFrequentPoints} from "./Movie";

export class Customer {
    private rentals: Rental[] = [];
    constructor(private readonly name: string) {
    }

    public addRental(movieRentals:Rental) {
        this.rentals.push(movieRentals);
    }

    public generateCustomerRentalReport(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints = 0;

        let result = "Rental Record for " + this.name + "\n";

        // for (const movieRental of this.rentals) {
        //     frequentRenterPoints += calculateRenterFrequentPoints(movieRental);
        //     // show figures line for this currentRental
        //     result += "\t" + movieRental.movie.title + "\t" + calculateRentalAmount(movieRental).toFixed(1) + "\n";
        //     totalAmount += calculateRentalAmount(movieRental);
        // }

        // for (const movieRental of this.rentals) {
        //     frequentRenterPoints += calculateRenterFrequentPoints(movieRental);
        // }
        //
        // for (const movieRental of this.rentals) {
        //     // show figures line for this currentRental
        //     result += "\t" + movieRental.movie.title + "\t" + calculateRentalAmount(movieRental).toFixed(1) + "\n";
        // }
        //
        // for (const movieRental of this.rentals) {
        //     totalAmount += calculateRentalAmount(movieRental);
        // }

        this.rentals.map(movieRental=>{
            frequentRenterPoints += calculateRenterFrequentPoints(movieRental);
            // show figures line for this currentRental
            result += "\t" + movieRental.movie.title + "\t" + calculateRentalAmount(movieRental).toFixed(1) + "\n";
            totalAmount += calculateRentalAmount(movieRental);
        })

        // add footer lines
        result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }

}