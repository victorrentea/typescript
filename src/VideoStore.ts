export class Movie {

  constructor(public title: string, public priceCode: MovieCategory){

  }
  
}

export enum MovieCategory {
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

  public addRental(rental: Rental): void {
    this.rentals.push(rental);
  }

  private calculateFrequentRenterPoints(rental: Rental): number {
    if (rental.movie.priceCode != null &&
      (rental.movie.priceCode == MovieCategory.NEW_RELEASE)
      && rental.days > 1
    ) {
      return 2
    } 
    return 1
  }

  private getStatementLine(rental: Rental): string {
    return "\t" + rental.movie.title + "\t" + this.calculatePrice(rental).toFixed(1) + "\n";
  }

  private calculatePrice(rental: Rental): number {
    switch (rental.movie.priceCode) {
      case MovieCategory.REGULAR:
        return rental.days <= 2 ? 2 : 2 + (rental.days - 2) * 1.5
      case MovieCategory.NEW_RELEASE:
        return rental.days * 3;
      case MovieCategory.CHILDRENS:
        return rental.days <= 3 ? 1.5 : 1.5 + (rental.days - 3) * 1.5;
      default: return 0;
    }
  }

  public generateStatement(): string {

    const statementStart = "Rental Record for " + this.name + "\n"

    const statementLines = this.rentals.reduce( (acc, rental) => ( acc + this.getStatementLine(rental) ) , "")

    const totalPrice: number = this.rentals.map( rental => this.calculatePrice(rental) ).reduce( (a,b) => a + b, 0)
    const statementFooter = "Amount owed is " + totalPrice.toFixed(1) + "\n";

    const frequentRenterPoints = this.rentals.map( rental => this.calculateFrequentRenterPoints(rental) ).reduce((a,b) => a + b, 0)
    const statementEnd = "You earned " + frequentRenterPoints + " frequent renter points";

    return statementStart + statementLines + statementFooter + statementEnd;

  }
}
