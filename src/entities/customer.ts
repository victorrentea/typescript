import {MOVIE_CATEGORY} from "../VideoStore";
import {Rental} from "./rental";
import {Movie} from "./movie";

export class Customer {
    private rentals: Rental[] = [];

    constructor(private readonly name: string) {
    }

    public addRental(rental: Rental) {
        this.rentals.push(rental);
    }

    public statement(): string {
        let frequentRenterPoints = 0;

        const resultStringArray = [`Rental Record for ${this.name}`];

        for (const rental of this.rentals) {
            // determine amounts for each line
            const thisAmount = rental.calculatePrice();
            // add frequent renter points
            frequentRenterPoints += rental.calculateFrequentRenterPoints();
            // show figures line for this rental
            resultStringArray.push(`\t${rental.movie.title}\t${thisAmount.toFixed(1)}`);
            // totalAmount += thisAmount;
        }
        const calculatedPerRentalArr: { price: number, frequentRenterPoints: number, textResult: string }[] = this.rentals.map(rental => {
            const price = rental.calculatePrice();
            return {
                price,
                frequentRenterPoints: rental.calculateFrequentRenterPoints(),
                textResult: `\t${rental.movie.title}\t${price.toFixed(1)}`
            };
        });
      const totalAmount = calculatedPerRentalArr.map(({price}) => price).reduce((acc, price) => acc + price, 0);
        // add footer lines
        // todo add text to array, use with replace
        resultStringArray.push(`Amount owed is ${totalAmount.toFixed(1)}`);
        resultStringArray.push(`You earned ${frequentRenterPoints} frequent renter points`);
        return resultStringArray.join('\n');
    }


}