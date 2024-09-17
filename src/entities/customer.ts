import {Rental} from "./rental";
import {RentSummary} from "./rent-summary";


export class Customer {
    private rentals: Rental[] = [];

    constructor(private readonly name: string) {
    }

    public addRental(rental: Rental) {
        this.rentals.push(rental);
    }

    public statement(): string {
        const rentSummaries = this.rentals.map(rental => rental.getSummary());
        const totalAmount = rentSummaries.reduce((acc, curr) => acc + curr.price, 0);
        const frequentRenterPoints = rentSummaries.reduce((acc, curr) => acc + curr.frequentRenterPoints, 0);
        const statementLines = rentSummaries.map(rental => rental.textResult).join('\n');
        return `Rental Record for ${this.name}\n` +
          statementLines + '\n' +
            `Amount owed is ${totalAmount.toFixed(1)}\n` +
            `You earned ${frequentRenterPoints} frequent renter points`;
    }
}