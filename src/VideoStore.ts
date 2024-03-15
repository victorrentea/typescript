export class Movie {
  public title: string;
  public movieCategory: MovieCategory;
  constructor(title: string, movieCategory: number) {
    this.title = title;
    this.movieCategory = movieCategory;
  }
}

type Rental = { movie: Movie, daysRenting: number };

export enum MovieCategory {
  REGULAR= 0,
  NEW_RELEASE= 1,
  CHILDRENS= 2,
};

const moviePricing:Record<MovieCategory, {basePrice:number,dayRentingCutoff:number,extraMultiplier:number}> = {
    [MovieCategory.REGULAR]: {basePrice: 2, extraMultiplier: 1.5, dayRentingCutoff: 2},
    [MovieCategory.NEW_RELEASE]: {basePrice: 0, extraMultiplier: 3, dayRentingCutoff: 0},
    [MovieCategory.CHILDRENS]: {basePrice: 1.5, extraMultiplier: 1.5, dayRentingCutoff: 3},
}

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addRental(movie: Movie, daysRenting: number) {
    this.rentals.push({ movie, daysRenting });
  }

  private calculateMoviePrice(rental: Rental): number {
    const { movie, daysRenting } = rental;
    const {basePrice,dayRentingCutoff,extraMultiplier} = moviePricing[movie.movieCategory];

    let price = basePrice;
    if(daysRenting > dayRentingCutoff){
        price += (daysRenting - dayRentingCutoff) * extraMultiplier;
    }

    return price;
  }

  private getFrequentRenterPointsForRental(rental: Rental): number {
    const { movie, daysRenting } = rental;
    if(movie.movieCategory === MovieCategory.NEW_RELEASE && daysRenting > 1) return 2;
    return 1;
  }

  public statement(): string {
    let totalPrice: number = 0;
    let frequentRenterPoints = 0;

    let result = "Rental Record for " + this.name + "\n";
    for (const rental of this.rentals) {
      const { movie } = rental;

      const price = this.calculateMoviePrice(rental);
      frequentRenterPoints+= this.getFrequentRenterPointsForRental(rental);

      result += "\t" + movie.title + "\t" + price.toFixed(1) + "\n";
      totalPrice += price;
    }
    // add footer lines
    result += "Amount owed is " + totalPrice.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";
    return result;
  }
}
