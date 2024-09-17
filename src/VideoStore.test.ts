import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Customer} from "./VideoStore";


describe('Videostore', () => {
    it('Characterization Test ', function () {

    const customer = new Customer("John Doe");
    customer.addRental({title:"Star Wars", priceCode: "newRelease"}, 6);
    customer.addRental({title:"Sofia", priceCode: "children"}, 7);
    customer.addRental({title:"Inception", priceCode: "regular"}, 5);

    const expected = "Rental Record for John Doe\n"
      + "	Star Wars	18.0\n"
      + "	Sofia	7.5\n"
      + "	Inception	6.5\n"
      + "Amount owed is 32.0\n"
      + "You earned 4 frequent renter points";

      expect(customer.statement()).to.equal(expected);
  });
});
