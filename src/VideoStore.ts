export class Movie {
  constructor(public readonly title: string,
              public readonly movieCategory: MovieCategory) {
  }
}

export enum MovieCategory {
  REGULAR = 'REGULAR',
  NEW_RELEASE = 'NEW_RELEASE',
  CHILDREN = 'CHILDREN',
}

const moviePricing:Record<MovieCategory, {basePrice:number,dayRentingCutoff:number,extraMultiplier:number}> = {
    [MovieCategory.REGULAR]: {basePrice: 2, extraMultiplier: 1.5, dayRentingCutoff: 2},
    [MovieCategory.NEW_RELEASE]: {basePrice: 0, extraMultiplier: 3, dayRentingCutoff: 0},
    [MovieCategory.CHILDREN]: {basePrice: 1.5, extraMultiplier: 1.5, dayRentingCutoff: 3},
}

class Rental {
  constructor(public readonly movie: Movie,
              public readonly daysRenting: number) {
  }

  public get price(): number { // a property, therefore a pure function
    const {
      basePrice, dayRentingCutoff, extraMultiplier
    } = moviePricing[this.movie.movieCategory];

    let price = basePrice;
    if(this.daysRenting > dayRentingCutoff){
      price += (this.daysRenting - dayRentingCutoff) * extraMultiplier;
    }
    return price;
  }

  public get frequentRenterPoints(): number {
    if (this.movie.movieCategory === MovieCategory.NEW_RELEASE && this.daysRenting > 1) return 2;
    return 1;
  }
}

export class Customer {
  private rentals: Rental[] = [];

  constructor(private readonly name: string) {
  }

  public addRental(movie: Movie, daysRenting: number) {
    this.rentals.push(new Rental(movie, daysRenting));
  }

  private static formatPrice(price: number): string {
    return price.toFixed(1);
  }

  public getStatement(): string {
    const totalPrice = this.rentals
      .map(rental => rental.price)
      .reduce((a, b) => a + b);

    const frequentRenterPoints = this.rentals
      .map(rental => rental.frequentRenterPoints)
      .reduce((a, b) => a + b);

    const header = `Rental Record for ${this.name}\n`;
    const body = this.rentals
        .map(rental => `\t${rental.movie.title}\t${Customer.formatPrice(rental.price)}\n`)
        .join("");
    const footer =
      `Amount owed is ${Customer.formatPrice(totalPrice)}\nYou earned ${frequentRenterPoints} frequent renter points`;

    // return `${header}${body}${footer}`;
    return [header, body, footer].join('');
    // return header + body + footer;
  }
}
