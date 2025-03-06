import {Movie} from "./Movie";
import {MovieCategory} from "./MovieCategory";

export class Rental {

  constructor(public readonly movie: Movie,
              public readonly rentDays: number) {
  }

  public get price(): number {
    switch (this.movie.category) {
      case MovieCategory.REGULAR:
        return this.getRegularMoviePrice(this.rentDays);
      case MovieCategory.NEW_RELEASE:
        return this.rentDays * 3;
      case MovieCategory.CHILDREN:
        return this.getChildrenMoviePrice(this.rentDays);
      default:
        return NaN;
    }
  }

  public get isEligibleForBonusPoints(): boolean {
    return this.movie.category === MovieCategory.NEW_RELEASE && this.rentDays > 1;
  }

  private getChildrenMoviePrice(rentDays: number): number {
    let movieTotalPrice = 1.5;
    if (rentDays > 3) {
      movieTotalPrice += (rentDays - 3) * 1.5;
    }

    return movieTotalPrice;
  }

  private getRegularMoviePrice(rentDays: number): number {
    let movieTotalPrice = 2;
    if (rentDays > 2) {
      movieTotalPrice += (rentDays - 2) * 1.5;
    }

    return movieTotalPrice;
  }

}
