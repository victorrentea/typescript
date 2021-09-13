import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Movie, MovieCategory} from "../src/cleancode/Movie";
import {Customer, Rental} from "../src/cleancode/Customer";
import {StatementGenerator} from "../src/cleancode/StatementGenerator";


describe('Videostore', () => {
    it('Characterization Test ', function () {

        let customer = new Customer("John Doe", [
            new Rental(new Movie("Star Wars", MovieCategory.NEW_RELEASE), 6),
            new Rental(new Movie("Sofia", MovieCategory.CHILDREN), 7),
            new Rental(new Movie("Inception", MovieCategory.REGULAR), 5)]);

        // customer.rentals.splice(1,1);

        const expected = "Rental Record for John Doe\n"
            + "	Star Wars	18.0\n"
            + "	Sofia	7.5\n"
            + "	Inception	6.5\n"
            + "Amount owed is 32.0\n"
            + "You earned 4 frequent renter points";

        let generator = new StatementGenerator();
        expect(generator.statement(customer.name, customer.rentals)).to.equal(expected);
    });
});
