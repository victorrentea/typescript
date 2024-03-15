export class Movie {
  public title: string;
  public priceCode: number;
  constructor(title: string, priceCode: number) {
    this.title = title;
    this.priceCode = priceCode;
  }
}

export const MOVIE_CATEGORY = { // wrong naming convention
  CHILDREN: 2,
  REGULAR: 0,
  NEW_RELEASE: 1,
};

type RENTAL = {
  movie: Movie;
  number: number;
};
export class Customer {
  private rentals: RENTAL[] = [];

  constructor(private readonly name: string) {}

  public addRental(m: Movie, d: number) {
    this.rentals.push({ number: d, movie: m });
  }

  public statement(): string {
    let totalAmount: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      let movie = rental.movie; //let
      let moviePrice = 0;
      let basePrice = rental.number;
      // determine amounts for each line
      switch (movie.priceCode) {
        case MOVIE_CATEGORY.REGULAR:
          moviePrice += 2;
          if (basePrice > 2) moviePrice += (basePrice - 2) * 1.5; // magic number
          break;
        case MOVIE_CATEGORY.NEW_RELEASE:
          moviePrice += basePrice * 3; // magic number
          break;
        case MOVIE_CATEGORY.CHILDREN:
          moviePrice += 1.5; // magic number
          if (basePrice > 3) moviePrice += (basePrice - 3) * 1.5; // magic number
          break;
      }
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (
        movie.priceCode != null &&
        movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE &&
        basePrice > 1
      )
        frequentRenterPoints++;
      // show figures line for this rental
      result += "\t" + movie.title + "\t" + moviePrice.toFixed(1) + "\n";
      totalAmount += moviePrice;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }
}
