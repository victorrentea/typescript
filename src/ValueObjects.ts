import {expect} from "chai";

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
  const criteriaInterval = {start: criteria.startYear, end: criteria.endYear};
  const results = models.filter(model =>
    MathUtil.intervalsIntersect({start: model.startYear, end: model.endYear}, criteriaInterval))
  // MathUtil.intervalsIntersect({a:model.startYear, b:model.endYear, c:criteria.startYear, d:criteria.endYear})) // future proof, allows addind a prop w/o breaking change
  // MathUtil.intervalsIntersect(model, criteria)) // too much coupling
  console.log("More filtering logic");
  return results;
}

function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect({start: 1000, end: 1600}, {start: 1250, end: 2000}));
}

type Interval = { start: number, end: number };

class MathUtil {
  // static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
  static intervalsIntersect(interval1: Interval, interval2: Interval): boolean {
    return interval1.start <= interval2.end && interval2.start <= interval1.end; // from SO
  }
}

class CarSearchCriteria {
  constructor(public readonly startYear: number,
              public readonly endYear: number,
              public readonly make: string) {
    if (startYear > endYear) throw new Error("start larger than end");
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

it('should filter car models', () => {
  const criteria = new CarSearchCriteria(2014, 2018, "Ford");
  const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
  const car2 = new CarModel("Renaul", "Megane", 2019, 2025);
  const initialList = [fordFocusMk2, car2];
  const models = filterCarModels(criteria, initialList);
  console.log("initial: ", initialList);
  console.log("result: ", models);
  expect(models).to.contain(fordFocusMk2);
});

