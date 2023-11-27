class SearchEngine {

  public filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {

    let result = models.filter(model => new Interval(model.startYear, model.endYear).intersects(criteria.yearInterval));

    console.log("More filtering logic");
    return result;
  }

  public applyCapacityFilter() {
    let interval = new Interval(1000, 1600);
    // interval.end = 2;
    console.log(interval.intersects(new Interval(1250, 2000)));
  }

}

function applyCapacityFilter() {
  console.log(new Interval(1000, 1600).intersects(new Interval(1250, 2000)));
}
// class PaginationOptions {
// class TwoIntervals {
export class Interval {
  constructor (public readonly start: number, public readonly end: number) {
    if (start > end) throw new Error("start larger than end");
  }

  intersects(other: Interval) {
    return this.start <= other.end && other.start <= this.end;
  }
}

export class IntervalInterface {
  public readonly start: number;
  public readonly end: number;

  intersects(other: Interval) {
    return this.start <= other.end && other.start <= this.end;
  }
}




// class MathUtil {

  // static intervalsIntersect({start1: number, end1: number, start2: number, end2: number}): boolean { // rau - headless
class CarSearchCriteria {
  constructor(public readonly yearInterval: Interval,
              public readonly make: string,
              ) {
  }
}

class CarModel {
  constructor(public readonly make: string,
              public readonly model: string,
              public readonly startYear: number,
              public readonly endYear: number) {
    if (startYear > endYear) {
      throw new Error("start larger than end");
    }
  }
}

let criteria = new CarSearchCriteria(new Interval(2014, 2018), "Ford");
let fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
// let models = filterCarModels(criteria, [fordFocusMk2]);
// console.log(models);





