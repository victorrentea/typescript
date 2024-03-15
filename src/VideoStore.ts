
export enum PriceCode {
  REGULAR = 'REGULAR',
  NEW_RELEASE = 'NEW_RELEASE',
  CHILDRENS = 'CHILDRENS'
};

export class Movie {
  constructor(public readonly title: string, public readonly priceCode: PriceCode) { }
}

class Rental {
  constructor(private readonly movie: Movie,
              private readonly daysRented: number) {
    if (daysRented <= 0) throw new Error('Days rented must be greater than 0');
  }

  get isEligibleForBonusPoints(): boolean {
    return this.movie.priceCode === PriceCode.NEW_RELEASE
  }

  get price() {
    const LATE_FEE = 1.5;
    const calculateLateFee = (daysRented: number, maxDaysRented: number) => Math.max(0, daysRented - maxDaysRented) * LATE_FEE;

    const REGULAR_PRICE_FIXED = 2;
    const CHILDRENS_PRICE_FIXED = 1.5;
    const NEW_RELEASE_PRICE_PER_DAY = 3;

    switch (this.movie.priceCode) {
      case PriceCode.NEW_RELEASE:
        return NEW_RELEASE_PRICE_PER_DAY * this.daysRented;
      case PriceCode.REGULAR:
        return REGULAR_PRICE_FIXED + calculateLateFee(this.daysRented, 2);
      case PriceCode.CHILDRENS:
        return CHILDRENS_PRICE_FIXED + calculateLateFee(this.daysRented, 3);
    }
  }

  public printableSummary(): string {
    return `\t${this.movie.title}\t${this.price.toFixed(1)}\n`;
  }
}

export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) { }

  get frequentRenterPoints() {
    const bonusPoints = this.rentals.filter(rental => rental.isEligibleForBonusPoints).length;
    return this.rentals.length + bonusPoints;
  }

  get totalAmount() {
    return this.rentals.reduce((acc, rental) => acc + rental.price, 0);
  }

  public addRental(movie: Movie, daysRented: number) {
    this.rentals.push(new Rental(movie, daysRented));
  }

  public getRentalsRecordSummary(): string {
    return this.summaryHeader() +
      this.printableRentalsSummary() +
      this.amountOwedSummary() +
      this.frequentRenterPointsSummary();
  }

  private summaryHeader = () =>
    "Rental Record for " + this.name + "\n";

  private printableRentalsSummary = () =>
    this.rentals.map(rental => rental.printableSummary()).join('');

  private amountOwedSummary = () =>
    "Amount owed is " + this.totalAmount.toFixed(1) + "\n";

  private frequentRenterPointsSummary = () =>
    "You earned " + this.frequentRenterPoints + " frequent renter points";
}
