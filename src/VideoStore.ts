import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Customer {
  private readonly name: string;
  private readonly rentals: Rental[] = [];
  private renterPoints = 0;

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, rentDuration: number): void {
    this.rentals.push(new Rental(movie, rentDuration));
  }

  public getRentalRecord(): string {
    let record = this.getRecordHeader(this.name);

    for (const rental of this.rentals) {
      this.renterPoints++;
      if (rental.isQualifiedForPointsBonus) {
        this.renterPoints++;
      }

      record += this.getRecordMovieLine(rental.movie.title, rental.price);
    }

    const totalPrice = this.rentals.map((rental) => rental.price).reduce((previous, current) => previous + current);
    record += this.getRecordFooter(totalPrice);

    return record;
  }

  private getRecordHeader(name: string): string {
    return "Rental Record for " + name + "\n";
  }

  private getRecordMovieLine(title: string, price: number): string {
    return "\t" + title + "\t" + price.toFixed(1) + "\n";
  }

  private getRecordFooter(totalPrice: number): string {
    let result = "Amount owed is " + totalPrice.toFixed(1) + "\n";
    result += "You earned " + this.renterPoints + " frequent renter points";

    return result;
  }

}
