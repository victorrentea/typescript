export class Movie {
  public title: string;
  public priceCode: number;

  constructor(title: string, priceCode: number) {
    this.title = title;
    this.priceCode = priceCode;
  }
}

export enum MOVIE_CATEGORY {
  CHILDRENS = 2,
  REGULAR = 0,
  NEW_RELEASE = 1
};


class Rental {
  public movie: Movie;
  public daysRented: number;

  constructor(movie: Movie, daysRented: number) {
    this.movie = movie;
    this.daysRented = daysRented;
  }

  get price() {
    let thisAmount = 0;
    switch (this.movie.priceCode) {
      case MOVIE_CATEGORY.REGULAR:
        thisAmount += 2;
        if (this.daysRented > 2)
          thisAmount += (this.daysRented - 2) * 1.5;
        break;
      case MOVIE_CATEGORY.NEW_RELEASE:
        thisAmount += this.daysRented * 3;
        break;
      case MOVIE_CATEGORY.CHILDRENS:
        thisAmount += 1.5;
        if (this.daysRented > 3)
          thisAmount += (this.daysRented - 3) * 1.5;
        break;
    }
    return thisAmount;
  }
}


export class Customer {
  private name: string;
  private rentals: Rental[] = [];
  private frequentRenterPoints: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, daysRented: number) {
    this.rentals.push(new Rental(movie, daysRented));
    this.frequentRenterPoints++;
    if (movie.priceCode != null &&
      (movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
      && daysRented > 1)
      this.frequentRenterPoints++;
  }

  public statement(): string {

    const totalRentalsInfoLine = "Rental Record for " + this.name + "\n";

    const individualRentalInfos = this.rentals.map((rental) => { return `\t${rental.movie.title}\t${rental.price.toFixed(1)}\n` });

    const totalAmount = this.rentals.reduce((acc, rental) => acc + rental.price, 0);

    const footerLine = "Amount owed is " + totalAmount.toFixed(1) + "\n";
    const eaarnedLine = "You earned " + this.frequentRenterPoints + " frequent renter points";
    return `${totalRentalsInfoLine}${individualRentalInfos.join('')}${footerLine}${eaarnedLine}`;

  }
}
