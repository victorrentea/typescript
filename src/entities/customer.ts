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
        const calculatedPerRentalArr: RentSummary[] = this.rentals.map(rental => {
            return rental.getSummary();
        });
        const totalAmount = calculatedPerRentalArr.reduce((acc, curr) => acc + curr.price, 0);
        const frequentRenterPoints = calculatedPerRentalArr.reduce((acc, curr) => acc + curr.frequentRenterPoints, 0);
        const statementines = calculatedPerRentalArr.map(rental => rental.textResult).join('\n');
        return `Rental Record for ${this.name}\n` +
            statementines + '\n' +
            `Amount owed is ${totalAmount.toFixed(1)}\n` +
            `You earned ${frequentRenterPoints} frequent renter points`;
    }
}