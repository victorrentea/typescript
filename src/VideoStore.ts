export class Movie {

  constructor(public title: string, public movieCategory: MovieCategory){}

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

  private calculateFrequentRenterPointsForRental(rental: Rental): number {
    if (rental.movie.movieCategory != null &&
      (rental.movie.movieCategory == MovieCategory.NEW_RELEASE)
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
    switch (rental.movie.movieCategory) {
      case MovieCategory.REGULAR:
        return rental.days <= 2 ? 2 : 2 + (rental.days - 2) * 1.5
      case MovieCategory.NEW_RELEASE:
        return rental.days * 3;
      case MovieCategory.CHILDRENS:
        return rental.days <= 3 ? 1.5 : 1.5 + (rental.days - 3) * 1.5;
      default: return 0;
    }
  }

  private calculateTotalPrice(): number {
    return this.rentals.map(rental => this.calculatePrice(rental)).reduce((a, b) => a + b, 0);
  }

  private calculateFrequentRenterPoints() {
    return this.rentals.map(rental => this.calculateFrequentRenterPointsForRental(rental)).reduce((a, b) => a + b, 0);
  }

  public generateStatement(): string {

    const statementStart = "Rental Record for " + this.name + "\n"

    const statementLines = this.rentals.reduce( (acc, rental) => ( acc + this.getStatementLine(rental) ) , "")

    const statementFooter = "Amount owed is " + this.calculateTotalPrice().toFixed(1) + "\n";

    const statementEnd = "You earned " + this.calculateFrequentRenterPoints() + " frequent renter points";

    return statementStart + statementLines + statementFooter + statementEnd;

  }




}
