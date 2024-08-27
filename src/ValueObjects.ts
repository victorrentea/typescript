import {expect} from "chai";

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
// new collection, less noise , FP ftw!
  return models.filter(model =>
      MathUtil.intervalsIntersect2({start: model.startYear, end: model.endYear}, {
        start: criteria.startYear,
        end: criteria.endYear
      }));
}


class MathUtil {
  // more semantics but harder to call
  static intervalsIntersect2(interval1: Interval, interval2: Interval): boolean {
    return interval1.start <= interval2.end && interval2.start <= interval1.end;
  }
}

// type Interval = [number, number];
interface Interval {
  start: number;
  end: number;
}


class CarSearchCriteria { // comes from JSON
  constructor(public readonly startYear: number,
              public readonly endYear: number,
              public readonly make: string) {
    if (startYear > endYear) throw new Error("start larger than end");
  }
}

class CarModel { // from my private DB = Domain Model
  constructor(public readonly make: string,
              public readonly model: string,
              public readonly startYear: number,
              public readonly endYear: number) {
    if (startYear > endYear) {
      throw new Error("start larger than end");
    }
  }
}

it('should filter car models', () => {
  const criteria = new CarSearchCriteria(2014, 2018, "Ford");
  const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
  const models = filterCarModels(criteria, [fordFocusMk2]);
  console.log(models);
  expect(models).to.contain(fordFocusMk2);
});

