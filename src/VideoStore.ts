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
  public movie: Movie = {title: "", priceCode: 0};
  public rentDays: number = 0;
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
    for (const r of this.rentals) {
      let each = r.movie;
      let thisAmount = 0;
      const rentTime = r.rentDays;
      // determine amounts for each line
      switch (each.priceCode) {
        case MOVIE_CATEGORY.REGULAR:
          thisAmount += 2;
          if (rentTime > 2)
            thisAmount += (rentTime - 2) * 1.5;
          break;
        case MOVIE_CATEGORY.NEW_RELEASE:
          thisAmount += rentTime * 3;
          break;
        case MOVIE_CATEGORY.CHILDREN:
          thisAmount += 1.5;
          if (rentTime > 3)
            thisAmount += (rentTime - 3) * 1.5;
          break;
      }
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (each.priceCode != null &&
          (each.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
          && rentTime > 1)
        frequentRenterPoints++;
      // show figures line for this rental
      result += "\t" + each.title + "\t" + thisAmount.toFixed(1) + "\n";
      totalAmount += thisAmount;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }
}
