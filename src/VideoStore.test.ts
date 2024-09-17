import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Customer, MovieCategory} from "./VideoStore";


describe('Videostore', () => {
    it('Characterization Test ', function () {

    const customer = new Customer("John Doe");
    customer.addRental({title:"Star Wars", priceCode: MovieCategory.NEW_RELEASE}, 6);
    customer.addRental({title:"Sofia", priceCode: MovieCategory.CHILDREN}, 7);
    customer.addRental({title:"Inception", priceCode: MovieCategory.REGULAR}, 5);

    const expected = "Rental Record for John Doe\n"
      + "	Star Wars	18.0\n"
      + "	Sofia	7.5\n"
      + "	Inception	6.5\n"
      + "Amount owed is 32.0\n"
      + "You earned 4 frequent renter points";

      expect(customer.generateReceipt()).to.equal(expected);
  });
});


