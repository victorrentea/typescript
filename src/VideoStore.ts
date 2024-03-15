export class Movie {
  constructor(public title: string, public priceCode: MovieCategory) {}
}

export enum MovieCategory {
  CHILDREN = 'children',
  REGULAR = 'regular',
  NEW_RELEASE = 'new release',
}

type Rental = {
  movie: Movie;
  basePrice: number;
};

export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) {}

  public addRental(movie: Movie, basePrice: number) {
    this.rentals.push({ basePrice, movie });
  }

  private getStatement = (rental: Rental) => "\t" + rental.movie.title + "\t" + rental.basePrice.toFixed(1) + "\n";

  private getStatementLine = () => this.rentals.reduce((acc, rental) => {
      return acc + this.getStatement(rental);
    }, "Rental Record for " + this.name + "\n");

  public statement(): string {
    let frequentRenterPoints = 0;

    const line = this.getStatementLine();

    let result = '';

    const calcPrice = (acc: number, rental: Rental) => {
      const moviePrice = this.getPriceByCategory(rental.movie, rental.basePrice);
      return acc + moviePrice;
    }

    const totalPrice = this.rentals.reduce(calcPrice, 0);

    for (const rental of this.rentals) {
      let movie = rental.movie; // let
      let basePrice = rental.basePrice;
      // determine amounts for each line

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
      // result += "\t" + movie.title + "\t" + moviePrice.toFixed(1) + "\n";
    }
    // add footer lines
    result += "Amount owed is " + totalPrice.toFixed(1) + "\n";
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
