// red
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {MOVIE_CATEGORY} from "./VideoStore";
import {Customer} from "./entities/customer";
import {Rental} from "./entities/rental";


describe('Videostore', () => {
    it('Characterization Test ', function () {

    const customer = new Customer("John Doe");
    customer.addRental(new Rental({title:"Star Wars", priceCode: MOVIE_CATEGORY.NEW_RELEASE}, 6));
    customer.addRental(new Rental({title:"Sofia", priceCode: MOVIE_CATEGORY.CHILDREN}, 7));
    customer.addRental(new Rental({title:"Inception", priceCode: MOVIE_CATEGORY.REGULAR}, 5));

    const expected = "Rental Record for John Doe\n"
      + "	Star Wars	18.0\n"
      + "	Sofia	7.5\n"
      + "	Inception	6.5\n"
      + "Amount owed is 32.0\n"
      + "You earned 4 frequent renter points";

      expect(customer.statement()).to.equal(expected);
  });
});
