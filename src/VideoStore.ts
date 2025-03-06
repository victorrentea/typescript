import {Movie} from "./Movie";
import {Rental} from "./Rental";

const sum = (a: number, b: number) => a + b;

export class Customer {
  private readonly name: string;
  private readonly rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, rentDuration: number): void {
    this.rentals.push(new Rental(movie, rentDuration));
  }

  public getRentalRecord = (): string => this.getHeader() + this.getBody() + this.getFooter();

  private getHeader = (): string => "Rental Record for " + this.name + "\n";

  private getBody = (): string => this.rentals.map(this.getBodyLine).join("");

  private getBodyLine = (rental: Rental): string => "\t" + rental.movie.title + "\t" + rental.price.toFixed(1) + "\n";

  private getFooter = (): string =>
    "Amount owed is " + this.getTotalPrice().toFixed(1) + "\n" +
    "You earned " + this.getTotalPoints() + " frequent renter points";

  private getTotalPrice = (): number =>
    this.rentals.map((rental) => rental.price).reduce(sum);

  private getTotalPoints = (): number =>
    this.rentals.map((rental) => this.computePoints(rental)).reduce(sum);

  private computePoints(rental: Rental): number {
    let renterPoints = 1;
    if (rental.isEligibleForBonusPoints) {
      renterPoints++;
    }
    return renterPoints;
  }


}
