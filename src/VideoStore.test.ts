import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Customer, Movie, MOVIE_CATEGORY} from "./VideoStore";

// Sabi was here
describe('Videostore', () => {
    it('Characterization Test ', function () {

    const customer = new Customer("John Doe");
    customer.addRental(new Movie("Star Wars", MOVIE_CATEGORY.NEW_RELEASE), 6);
    customer.addRental(new Movie("Sofia", MOVIE_CATEGORY.CHILDRENS), 7);
    customer.addRental(new Movie("Inception", MOVIE_CATEGORY.REGULAR), 5);

    const expected = "Rental Record for John Doe\n"
      + "	Star Wars	18.0\n"
      + "	Sofia	7.5\n"
      + "	Inception	6.5\n"
      + "Amount owed is 32.0\n"
      + "You earned 4 frequent renter points";

      expect(customer.generateCustomerRentalReport()).to.equal(expected);
  });
});
