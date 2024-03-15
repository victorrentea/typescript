export class Movie {

  constructor(public readonly title: string, public readonly movieCategory: MovieCategory){}

}

export enum MovieCategory {
  CHILDRENS,
  REGULAR,
  NEW_RELEASE
};


export class Rental {

  constructor(public readonly movie: Movie, public readonly days: number){}

  getPrice(): number {
    switch (this.movie.movieCategory) {
      case MovieCategory.REGULAR:
        return this.days <= 2 ? 2 : 2 + (this.days - 2) * 1.5
      case MovieCategory.NEW_RELEASE:
        return this.days * 3;
      case MovieCategory.CHILDRENS:
        return this.days <= 3 ? 1.5 : 1.5 + (this.days - 3) * 1.5;
      default: return 0;
    }
  }

  getStatement(): string {
    return "\t" + this.movie.title + "\t" + this.getPrice().toFixed(1) + "\n";
  }

  calculateFrequentRenterPoints(): number {
    if (this.movie.movieCategory != null &&
      (this.movie.movieCategory == MovieCategory.NEW_RELEASE)
      && this.days > 1
    ) {
      return 2
    } 
    return 1
  }
}

export class Customer {
  private rentals: Rental[] = [];

  constructor(public readonly name: string) {
    this.name = name;
  }

  public addRental(rental: Rental): void {
    this.rentals.push(rental);
  }

  public generateStatement = () => this.generateStatementStart() + this.generateStatementLines() +  this.generateStatementFooter() + this.generateStatementEnd();

  private generateStatementStart = () => "Rental Record for " + this.name + "\n";
  private generateStatementLines = () => this.rentals.reduce((acc, rental) => (acc + rental.getStatement()), "");
  private generateStatementFooter = () => "Amount owed is " + this.calculateTotalPrice().toFixed(1) + "\n";
  private generateStatementEnd = () => "You earned " + this.calculateFrequentRenterPoints() + " frequent renter points";

  private calculateTotalPrice = () => this.rentals.map(rental => rental.getPrice()).reduce((a, b) => a + b, 0);

  private calculateFrequentRenterPoints = () => this.rentals.map(rental => rental.calculateFrequentRenterPoints()).reduce((a, b) => a + b, 0);

  

}
