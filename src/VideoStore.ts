export class Movie {
  constructor(public title: string,
              public priceCode: MovieCategory) {
  }
}

export enum MovieCategory {
  REGULAR = 0,
  NEW_RELEASE = 1,
  CHILDREN = 2
}

export type Rental = {
    movie: Movie,
    days: number
}

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, days: number) {
    this.rentals.push({days: days, movie: movie});
  }

  public generateReceipt(): string {
    return this.producerReceiptHeader() + this.produceReceiptBody() + this.produceReceiptFooter();
  }

    private producerReceiptHeader() {
        return "Rental Record for " + this.name + "\n";
    }

    private produceReceiptFooter() {
        let result = "";
        const totalPrice = this.calculateTotalRentalsPrice();
        const frequentRenterPoints = this.calculateTotalFrequencyRenterPoints();
        result += "Amount owed is " + totalPrice.toFixed(1) + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";

        return result;
    }

    private produceReceiptBody(): string {
      let result = "";

      for (const rental of this.rentals) {
          const currentRentalPrice = this.calculateRentalPrice(rental);
          result += "\t" + rental.movie.title + "\t" + currentRentalPrice.toFixed(1) + "\n";
      }

      return result;
  }

  private calculateTotalRentalsPrice(): number {
    return this.rentals.reduce((totalPrice, rental) => totalPrice + this.calculateRentalPrice(rental), 0);
  }

  private calculateTotalFrequencyRenterPoints(): number {
      return this.rentals.reduce((points, rental) => points + this.calculateRentalFrequencyRenterPoints(rental), 0);
    }

  private calculateRentalFrequencyRenterPoints(rental: Rental): number {
    return this.isBonusEligible(rental) ? 2 : 1;
  }

  private isBonusEligible(rental: Rental): boolean {
    return rental?.movie?.priceCode === MovieCategory.NEW_RELEASE
        && rental.days > 1;
  }

  private calculateRentalPrice(rental: Rental): number {
    return this.movieCategoryToRentalPriceMap.get(rental.movie.priceCode)?.(rental.days) ?? 0;
  }

  private movieCategoryToRentalPriceMap: Map<MovieCategory, (days:number) => number> =
      new Map<MovieCategory, (days: number) => number>([
    [MovieCategory.REGULAR, (days: number) => {
      let price = 2;
      if (days > 2)
        price += (days - 2) * 1.5;
      return price;
    }],
    [MovieCategory.NEW_RELEASE, (days: number) => days * 3],
    [MovieCategory.CHILDREN, (days: number) => {
      let price = 1.5;
      if (days > 3)
        price += (days - 3) * 1.5;
      return price;
    }]
  ]);

}
