export class Movie {
  public title: string;
  public movieCategory: MovieCategory;
  constructor(title: string, movieCategory: MovieCategory) {
    this.title = title;
    this.movieCategory = movieCategory;
  }
}

export enum MovieCategory {
  REGULAR = 'REGULAR',
  NEW_RELEASE = 'NEW_RELEASE',
  CHILDRENS = 'CHILDRENS',
}

const moviePricing:Record<MovieCategory, {basePrice:number,dayRentingCutoff:number,extraMultiplier:number}> = {
    [MovieCategory.REGULAR]: {basePrice: 2, extraMultiplier: 1.5, dayRentingCutoff: 2},
    [MovieCategory.NEW_RELEASE]: {basePrice: 0, extraMultiplier: 3, dayRentingCutoff: 0},
    [MovieCategory.CHILDRENS]: {basePrice: 1.5, extraMultiplier: 1.5, dayRentingCutoff: 3},
}

class Rental {
  public movie: Movie;
  public daysRenting: number;
  constructor(movie: Movie, daysRenting: number) {
    this.movie = movie;
    this.daysRenting = daysRenting;
  }

  public getPrice(): number {
    const {
      basePrice, dayRentingCutoff, extraMultiplier
    } = moviePricing[this.movie.movieCategory];

    let price = basePrice;
    if(this.daysRenting > dayRentingCutoff){
      price += (this.daysRenting - dayRentingCutoff) * extraMultiplier;
    }

    return price;
  }

  public getFrequentRenterPoints(): number {
    if (this.movie.movieCategory === MovieCategory.NEW_RELEASE && this.daysRenting > 1) return 2;
    return 1;
  }
}

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, daysRenting: number) {
    this.rentals.push(new Rental(movie, daysRenting));
  }

  private static formatPrice(price: number): string {
    return price.toFixed(1);
  }
  public getStatement(): string {
    const totalPrice = this.rentals
      .map(rental => rental.getPrice())
      .reduce((a, b) => a + b);

    const frequentRenterPoints = this.rentals
      .map(rental => rental.getFrequentRenterPoints())
      .reduce((a, b) => a + b);

    const resultHeader = `Rental Record for ${this.name}\n`;
    const resultLines = this.rentals
        .map(rental => `\t${rental.movie.title}\t${Customer.formatPrice(rental.getPrice())}\n`)
        .reduce((a, b) => a + b);
    const resultFooter =
      `Amount owed is ${Customer.formatPrice(totalPrice)}\nYou earned ${frequentRenterPoints} frequent renter points`;

    return [resultHeader, resultLines, resultFooter].join('');
  }
}
