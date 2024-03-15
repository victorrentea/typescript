export class Movie {
  public title: string;
  public priceCode: MOVIE_CATEGORY;
}

export enum MOVIE_CATEGORY {
  CHILDRENS,
  REGULAR,
  NEW_RELEASE
};


type Rental = {
  movie: Movie;
  days: number;
}

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, days: number): void {
    this.rentals.push({days, movie});
  }

  public statement(): string {
    let totalAmount: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      // determine amounts for each line
      const thisAmount = determAmount(rental);
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (rental.movie.priceCode != null &&
          (rental.movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
          && rental.days > 1)
        frequentRenterPoints++;
      // show figures line for this rental
      result += "\t" + rental.movie.title + "\t" + thisAmount.toFixed(1) + "\n";
      totalAmount += thisAmount;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;

    function determAmount(rental: Rental) {
      switch (rental.movie.priceCode) {
        case MOVIE_CATEGORY.REGULAR:
          return rental.days <= 2 ? 2 : 2 + (rental.days - 2) * 1.5
        case MOVIE_CATEGORY.NEW_RELEASE:
          return rental.days * 3;
        case MOVIE_CATEGORY.CHILDRENS:
          return rental.days <= 3 ? 1.5 : 1.5 + (rental.days - 3) * 1.5;
        default: return 0;
      }
    }
  }
}
