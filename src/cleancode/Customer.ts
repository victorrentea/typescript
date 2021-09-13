import {Movie, MovieCategory} from "./Movie";

export class Rental {
  constructor(public readonly movie:Movie, public readonly daysRented:number) {
  }

  public computeRenterPoints() {
    let result = 1;
    let isNewRelease = this.movie.category == MovieCategory.NEW_RELEASE;
    if (isNewRelease && this.daysRented >= 2) {
      result++;
    }
    return result;
  }
  public computePrice(): number {
    // let m : Map<MovieCategory, (a:number)=> number>;
    // const map = {
    //   [MovieCategory.REGULAR]:this.computeRegularPrice,
    //   [MovieCategory.NEW_RELEASE]:this.computeNewReleasePrice,
    //   [MovieCategory.CHILDREN]:this.computeChildrenPrice
    // };
    // return map[MovieCategory.REGULAR]();

    // for (let id of lista) {
    //   await getCustomer(id);
    // }

    // promise.all(lista.map(id=>getCustomer(id)))
    // let promise = getCustomer(id);
    // all(promise1,promis2..)

      switch (this.movie.category) {
        case MovieCategory.REGULAR: return this.computeRegularPrice();
        case MovieCategory.NEW_RELEASE:     return this.computeNewReleasePrice();
        case MovieCategory.CHILDREN:     return this.computeChildrenPrice();
        default:throw new Error("Unknown category: " + this.movie.category);
      }


  }



  private computeChildrenPrice() {
    let result = 1.5;
    if (this.daysRented > 3)
      result += (this.daysRented - 3) * 1.5;
    return result;
  }

  private computeNewReleasePrice() {
    return this.daysRented * 3;
  }

  private computeRegularPrice() {
    let result = 2;
    if (this.daysRented > 2)
      result += (this.daysRented - 2) * 1.5;
    return result;
  }
}
interface MoviePriceCalculator {
  computePrice(daysRented: number);
}


export class Customer {
  // private readonly rentals: Rental[] = [];
  // public readonly rentals: Rental[];

  constructor(public readonly name: string, public readonly rentals: Rental[]) {
    // this._rentals = Object.freeze(rentals);
  }
  // get rentals() {
  //   return Object.freeze(this._rentals)
  // }

}


