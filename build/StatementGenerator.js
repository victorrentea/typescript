"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatementGenerator {
    statement(customerName, rentals) {
        return this.formatHeader(customerName)
            + this.formatBody(rentals)
            + this.formatFooter(rentals);
    }
    formatBody(rentals) {
        return rentals.map(this.formatStatementLine).join("");
    }
    formatStatementLine(rental) {
        return "\t" + rental.movie.title + "\t" + rental.computePrice().toFixed(1) + "\n";
    }
    computeTotalPoints(rentals) {
        return rentals.reduce((sum, r) => sum + r.computeRenterPoints(), 0);
    }
    computeTotalPrice(rentals) {
        return rentals.map(r => r.computePrice()).reduce((a, b) => a + b, 0);
    }
    formatHeader(customerName) {
        return "Rental Record for " + customerName + "\n";
    }
    formatFooter(rentals) {
        let totalPrice = this.computeTotalPrice(rentals);
        let frequentRenterPoints = this.computeTotalPoints(rentals);
        return "Amount owed is " + totalPrice.toFixed(1) + "\n"
            + "You earned " + frequentRenterPoints + " frequent renter points";
    }
}
exports.StatementGenerator = StatementGenerator;
