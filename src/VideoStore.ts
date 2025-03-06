export class Movie {
  public title: string = "";
  public priceCode: number = 1;

  constructor(title: string, priceCode: number) {
    this.title = title;
    this.priceCode = priceCode;
  }

  public calculateRentalAmount(numberOfDays: number): number {
    let currentAmount = 0;
    switch (this.priceCode) {
      case MOVIE_CATEGORY.REGULAR:
        currentAmount += 2;
        if (numberOfDays > 2)
          currentAmount += (numberOfDays - 2) * 1.5;
        break;
      case MOVIE_CATEGORY.NEW_RELEASE:
        currentAmount += numberOfDays * 3;
        break;
      case MOVIE_CATEGORY.CHILDRENS:
        currentAmount += 1.5;
        if (numberOfDays > 3)
          currentAmount += (numberOfDays - 3) * 1.5;
        break;
    }
    return currentAmount;
  }

  public calculateRenterFrequentPoints(numberOfDays: number,frequentRenterPoints: number): number {
    frequentRenterPoints++;
    if (this.priceCode != null &&
        (this.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
        && numberOfDays > 1)
      frequentRenterPoints++;
    return frequentRenterPoints;
  }


}

export const MOVIE_CATEGORY = {
  CHILDRENS: 2,
  REGULAR: 0,
  NEW_RELEASE: 1
};

interface Rental {
    numberOfDays: number;
    movie: Movie;
}


export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, numberOfDays: number) {
    this.rentals.push({numberOfDays: numberOfDays, movie: movie});
  }

  public generateCustomerRentalReport(): string {
    let totalAmount: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const currentRental of this.rentals) {
      let currentMovie = currentRental.movie;
      const numberOfDays = currentRental.numberOfDays;
      // determine amounts for currentMovie line
      let currentAmount = currentMovie.calculateRentalAmount(numberOfDays);
      // add frequent renter points
      // add bonus for a two day new release currentRental
      frequentRenterPoints = currentMovie.calculateRenterFrequentPoints(numberOfDays, frequentRenterPoints);
      // show figures line for this currentRental
      result += "\t" + currentMovie.title + "\t" + currentAmount.toFixed(1) + "\n";
      totalAmount += currentAmount;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }

}
