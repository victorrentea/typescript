export class Movie {
  constructor(
    public readonly title: string,
    public readonly priceCode: MovieCategory) {
  }
}

export enum MovieCategory {
  REGULAR = 0,
  NEW_RELEASE = 1,
  CHILDREN = 2,
  ELDERS = 3
}

export type Rental = {
  movie: Movie,
  days: number
}

export class Customer {
  private readonly name: string;
  private readonly rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }
  private movieCategoryToRentalPriceMapObj = {
    [MovieCategory.REGULAR]: this.computeRegularPrice,
    [MovieCategory.NEW_RELEASE]: (days: number) => days * 3,
    [MovieCategory.CHILDREN]: this.computeChildrenPrice,
    // ["pig"]: (days: number) => days * 3
  }
  private movieCategoryToRentalPriceMap = new Map<MovieCategory, (days: number) => number>([
    [MovieCategory.REGULAR, this.computeRegularPrice],
    [MovieCategory.NEW_RELEASE, (days: number) => days * 3],
    [MovieCategory.CHILDREN, this.computeChildrenPrice],
    // ["pig", (days: number) => days * 3]   WINS: linter KO
  ]);

  public addRental(rental: Rental): void {
    this.rentals.push(rental);
  }

  public generateReceipt(): string {
    return this.produceHeader() + this.produceBody() + this.produceFooter();
  }

  private produceHeader() {
    return "Rental Record for " + this.name + "\n";
  }

  private produceFooter() {
    const price = this.calculateTotalPrice();
    const frequentRenterPoints = this.calculateTotalPoints();
    return "Amount owed is " + price.toFixed(1) + "\n"
      + "You earned " + frequentRenterPoints + " frequent renter points";
  }

  private produceBody(): string {
    // let result = "";
    // for (const rental of this.rentals) {
    //   result += this.produceBodyLine(rental);
    // }
    // return this.rentals.map(rental => this.produceBodyLine(rental)).join("");
    return this.rentals.map(this.produceBodyLine).join("");
  }

  private produceBodyLine = (rental: Rental): string =>
    "\t" + rental.movie.title + "\t" + this.calculateRentalPrice(rental).toFixed(1) + "\n";

  private calculateTotalPrice = (): number =>
    // this.rentals.reduce((totalPrice, rental) => totalPrice + this.calculateRentalPrice(rental), 0);
    this.rentals.map(this.calculateRentalPrice).reduce((a, b) => a + b, 0);

  private calculateTotalPoints(): number {
    return this.rentals.reduce((points, rental) => points + this.calculateRentalFrequencyRenterPoints(rental), 0);
  }

  private calculateRentalFrequencyRenterPoints = (rental: Rental): number => this.isEligibleForBonus(rental) ? 2 : 1;

  //  vs Map

  private isEligibleForBonus(rental: Rental): boolean {
    return rental.movie.priceCode === MovieCategory.NEW_RELEASE
      && rental.days > 1;
  }

  private calculateRentalPrice(rental: Rental): number {
    // this.movieCategoryToRentalPriceMapObj["a"]?.(rental.days); // SH*T < BIG PROBLEM
    // this.movieCategoryToRentalPriceMapObj[1]?.(rental.days); // OK
    // this.movieCategoryToRentalPriceMapObj[42]?.(rental.days); // KO

    const f = this.movieCategoryToRentalPriceMap.get(rental.movie.priceCode);
    if (f === undefined) { // TODO remove
      throw new Error("Unknown movie category " + rental.movie.priceCode);
    }
    return f(rental.days) ?? 0;
    // in Java this would be :
  }

  private computeChildrenPrice(days: number): number {
    let price = 1.5;
    if (days > 3)
      price += (days - 3) * 1.5;
    return price;
  }

  private computeRegularPrice(days: number): number {
    let price = 2;
    if (days > 2)
      price += (days - 2) * 1.5;
    return price;
  }
}


// interface MyObjLayout {
//   property: string;
// }
// var obj: MyObjLayout = { property: "foo" };

