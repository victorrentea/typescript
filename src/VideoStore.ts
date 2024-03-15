export class Movie {
  constructor(public title: string, public priceCode: MovieCategory) {}
}

export enum MovieCategory {
  CHILDREN = 'children',
  REGULAR = 'regular',
  NEW_RELEASE = 'new release',
}

type Rental = { // TODO wrong naming convention -> MovieCategory
  movie: Movie;
  number: number;
};
export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) {}

  public addRental(m: Movie, d: number) {
    this.rentals.push({ number: d, movie: m });
  }

  public statement(): string {
    let totalAmount: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      let movie = rental.movie; // let
      let basePrice = rental.number;
      // determine amounts for each line
      const moviePrice = this.getPriceByCategory(movie, basePrice);
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (
        movie.priceCode != null &&
        movie.priceCode == MovieCategory.NEW_RELEASE &&
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

  private getPriceByCategory(movie: Movie, basePrice: number) {
    let moviePrice = 0; // this should be a const
    switch (movie.priceCode) {
      case MovieCategory.REGULAR:
        moviePrice += 2;
        if (basePrice > 2) moviePrice += (basePrice - 2) * 1.5; // magic number
        break;
      case MovieCategory.NEW_RELEASE:
        moviePrice += basePrice * 3; // magic number
        break;
      case MovieCategory.CHILDREN:
        moviePrice += 1.5; // magic number
        if (basePrice > 3) moviePrice += (basePrice - 3) * 1.5; // magic number
        break;
    }
    return moviePrice;
  }
}
