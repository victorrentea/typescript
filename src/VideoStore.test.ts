import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Customer} from "./Customer";
import {NewReleaseMovie} from "./NewReleaseMovie";
import {ChildrensMovie} from "./ChildrensMovie";
import {RegularMovie} from "./RegularMovie";

describe('Videostore', () => {
    it('Characterization Test ', function () {

        const customer = new Customer("John Doe");
        customer.addRental(new NewReleaseMovie("Star Wars"), 6);
        customer.addRental(new ChildrensMovie("Sofia"), 7);
        customer.addRental(new RegularMovie("Inception"), 5);

        const expected = "Rental Record for John Doe\n"
            + "	Star Wars	18.0\n"
            + "	Sofia	7.5\n"
            + "	Inception	6.5\n"
            + "Amount owed is 32.0\n"
            + "You earned 4 frequent renter points";

        expect(customer.statement()).to.equal(expected);
    });

});
