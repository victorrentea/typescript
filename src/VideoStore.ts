export class Movie {
  public title: string = "";
  public priceCode: number = 1;
}

export const MOVIE_CATEGORY = {
  CHILDREN: 2,
  REGULAR: 0,
  NEW_RELEASE: 1
};

export class Rental {

  constructor(public readonly movie: Movie, public readonly rentDays: number) {

  }
}

export class Customer {
  private readonly name: string;
  private readonly rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, rentDuration: number) {
    this.rentals.push({movie: movie, rentDays: rentDuration});
  }

  public statement(): string {
    let totalAmount: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      let movieTotalPrice = 0;
      // determine amounts for each line
      switch (rental.movie.priceCode) {
        case MOVIE_CATEGORY.REGULAR:
          movieTotalPrice += 2;
          if (rental.rentDays > 2)
            movieTotalPrice += (rental.rentDays - 2) * 1.5;
          break;
        case MOVIE_CATEGORY.NEW_RELEASE:
          movieTotalPrice += rental.rentDays * 3;
          break;
        case MOVIE_CATEGORY.CHILDREN:
          movieTotalPrice += 1.5;
          if (rental.rentDays > 3)
            movieTotalPrice += (rental.rentDays - 3) * 1.5;
          break;
      }
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (rental.movie.priceCode != null &&
          (rental.movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
          && rental.rentDays > 1)
        frequentRenterPoints++;
      // show figures line for this rental
      result += "\t" + rental.movie.title + "\t" + movieTotalPrice.toFixed(1) + "\n";
      totalAmount += movieTotalPrice;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }
}
