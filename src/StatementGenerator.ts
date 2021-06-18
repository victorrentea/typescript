import {Rental} from "./Customer";

export class StatementGenerator {

    public statement(customerName: string, rentals: Rental[]): string {
        return this.formatHeader(customerName)
            + this.formatBody(rentals)
            + this.formatFooter(rentals);
    }


    private formatBody(rentals: Rental[]) {
        return rentals.map(this.formatStatementLine).join("");
    }

    private formatStatementLine(rental: Rental) {
        return "\t" + rental.movie.title + "\t" + rental.computePrice().toFixed(1) + "\n";
    }

    private computeTotalPoints(rentals: Rental[]) {
        return rentals.reduce((sum, r) => sum + r.computeRenterPoints(), 0);
    }

    private computeTotalPrice(rentals: Rental[]) {
        return rentals.map(r => r.computePrice()).reduce((a, b) => a + b, 0);
    }

    private formatHeader(customerName: string) {
        return "Rental Record for " + customerName + "\n";
    }

    private formatFooter(rentals: Rental[]) {
        let totalPrice = this.computeTotalPrice(rentals);
        let frequentRenterPoints = this.computeTotalPoints(rentals);
        return "Amount owed is " + totalPrice.toFixed(1) + "\n"
            + "You earned " + frequentRenterPoints + " frequent renter points";
    }
}