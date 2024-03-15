export enum MovieCategory {
  CHILDREN = "children",
  REGULAR = "regular",
  NEW_RELEASE = "new release",
}

type Rental = {
  movie: Movie;
  basePrice: number;
}

export class Movie {
  constructor(public readonly title: string,
              public readonly priceCode: MovieCategory) {}
}

export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) {}

  public addRental(movie: Movie, basePrice: number) {
    this.rentals.push({ basePrice, movie });
  }

  private getStatement = (rental: Rental) =>
    "\t" +
    rental.movie.title +
    "\t" +
    this.getPriceByCategory(rental.movie, rental.basePrice).toFixed(1) +
    "\n";

  private getStatementLine = () =>
    "Rental Record for " +
    this.name +
    "\n" +
    this.rentals.map(this.getStatement).reduce((a, b) => a + b);

  private calcPrice(acc: number, moviePrice: number) {
    return acc + moviePrice;
  }

  public statement(): string {
    const totalPrice = this.rentals
      .map((rental) => this.getPriceByCategory(rental.movie, rental.basePrice))
      .reduce(this.calcPrice, 0);

    const frequentRenterPoints = this.rentals.map(this.computeFrequentPoints).reduce((acc, point) => acc + point, 0);

    // add footer lines
    return (
      this.getStatementLine() +
      "Amount owed is " +
      totalPrice.toFixed(1) +
      "\n" +
      "You earned " +
      frequentRenterPoints +
      " frequent renter points"
    );
  }

  private computeFrequentPoints(rental: Rental) {

    const isNewRelease =
        rental.movie.priceCode != null &&
        rental.movie.priceCode == MovieCategory.NEW_RELEASE;

    if (isNewRelease && rental.basePrice > 1) return 2;
    return 1;
  }

  private getPriceByCategory(movie: Movie, basePrice: number) {
    const calcDiscount = (basePrice: number, discountNum: number) =>
      (basePrice - discountNum) * 1.5;

    switch (movie.priceCode) {
      case MovieCategory.REGULAR:
        if (basePrice > 2) return 2 + calcDiscount(basePrice, 2);
        return 2;

      case MovieCategory.NEW_RELEASE:
        return basePrice * 3;

      case MovieCategory.CHILDREN:
        if (basePrice > 3) return 1.5 + calcDiscount(basePrice, 3);
        if (basePrice > 6) return 1.5 + calcDiscount(basePrice, 6);
        return 1.5; // magic number
    }
  }
}
