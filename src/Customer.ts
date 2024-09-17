import {Rental} from "./Rental";
import {Movie} from "./Movie";

export class Customer {
    constructor(
        private readonly name: string,
        private readonly rentals: Rental[] = []) {
    }

    public addRental(movie: Movie, rentalDays: number) {
        this.rentals.push(new Rental(movie, rentalDays));
    }

    public statement(): string {
        const totalAmount = this.calculateTotalAmount();
        const frequentRenterPoints = this.calculateFrequentRenterPoints();
        const rentalRecords = this.buildRentalRecords();
        return [
            `Rental Record for ${this.name}\n`,
            rentalRecords,
            `Amount owed is ${totalAmount.toFixed(1)}\n`,
            `You earned ${frequentRenterPoints} frequent renter points`
        ].join('');
    }

    private buildRentalRecords(): string {
        return this.rentals.map(rental => {
            const amount = rental.movie.calculateAmount(rental.rentalDays);
            return `\t${rental.movie.title}\t${amount.toFixed(1)}\n`;
        }).join('');
    }

    private calculateTotalAmount(): number {
        return this.rentals.reduce((total, rental) =>
            total + rental.movie.calculateAmount(rental.rentalDays), 0);
    }

    private calculateFrequentRenterPoints(): number {
        return this.rentals.reduce((points, rental) =>
            rental.movie.calculateFrequentRenterPoints(points, rental.rentalDays), 0);
    }
}
