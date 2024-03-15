export class Movie {
  public title: string;
  public movieCategory: MovieCategory;
  constructor(title: string, movieCategory: number) {
    this.title = title;
    this.movieCategory = movieCategory;
  }
}

type Rental = { movie: Movie, daysRenting: number };

export enum MovieCategory {
  REGULAR= 0,
  NEW_RELEASE= 1,
  CHILDRENS= 2,
};


export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, daysRenting: number) {
    this.rentals.push({ movie, daysRenting });
  }

  private calculateMoviePrice(rental: Rental): number {
    const { movie, daysRenting } = rental;
    let price = 0;
    switch (movie.movieCategory) {
      case MovieCategory.REGULAR:
        price = 2;
        if (daysRenting > 2)
          price += (daysRenting - 2) * 1.5;
        break;
      case MovieCategory.NEW_RELEASE:
        price = daysRenting * 3;
        break;
      case MovieCategory.CHILDRENS:
        price = 1.5;
        if (daysRenting > 3)
          price += (daysRenting - 3) * 1.5;
        break;
    }
    return price;
  }

  public statement(): string {
    let totalPrice: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      // determine amounts for each line
      const price = this.calculateMoviePrice(rental);
      const { daysRenting, movie } = rental;
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (movie.movieCategory === MovieCategory.NEW_RELEASE && daysRenting > 1)
        frequentRenterPoints++;
      // show figures line for this rental
      result += "\t" + movie.title + "\t" + price.toFixed(1) + "\n";
      totalPrice += price;
    }
    // add footer lines
    result += "Amount owed is " + totalPrice.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }
}
