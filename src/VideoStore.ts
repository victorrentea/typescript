
export enum PriceCode {
  REGULAR = 'REGULAR',
  NEW_RELEASE = 'NEW_RELEASE',
  CHILDRENS = 'CHILDRENS'
};

export class Movie {
  constructor(public readonly title: string, public readonly priceCode: PriceCode) { }
}


class Rental {
  constructor(private readonly movie: Movie, private readonly daysRented: number) { }

  get isEligableForBonusPoints(): boolean {
    return this.movie.priceCode === PriceCode.NEW_RELEASE && this.daysRented > 1
  }

  get price() {
    const LATE_FEE = 1.5;
    const calculateLateFee = (daysRented: number, maxDaysRented: number) => Math.max(0, daysRented - maxDaysRented) * LATE_FEE;

    switch (this.movie.priceCode) {
      case PriceCode.NEW_RELEASE:
        return this.daysRented * 3;
      case PriceCode.REGULAR:
        return 2 + calculateLateFee(this.daysRented, 2);
      case PriceCode.CHILDRENS:
        return 1.5 + calculateLateFee(this.daysRented, 3);
    }
  }

  public printableSummary(): string {
    return `\t${this.movie.title}\t${this.price.toFixed(1)}\n`;
  }
}


export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) {
  }

  get frequentRenterPoints() {
    return this.rentals.filter(r => r.isEligableForBonusPoints).length + this.rentals.length;
  }

  get totalAmount() {
    return this.rentals.reduce((acc, rental) => acc + rental.price, 0);
  }

  printableRentalSummaries() {
    return this.rentals.map((rental) => rental.printableSummary()).join('');
  }

  public addRental(movie: Movie, daysRented: number) {
    this.rentals.push(new Rental(movie, daysRented));
  }

  public getRentalRecordSummary(): string {
    const summaryHeader = "Rental Record for " + this.name + "\n";

    const amountOwedSummary = "Amount owed is " + this.totalAmount.toFixed(1) + "\n";

    const frequentRenterPointsSummary = "You earned " + this.frequentRenterPoints + " frequent renter points";

    return summaryHeader +
      this.printableRentalSummaries() +
      amountOwedSummary +
      frequentRenterPointsSummary;
  }
}
