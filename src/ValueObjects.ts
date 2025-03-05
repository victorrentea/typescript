import {expect} from "chai";

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
  const results = models.filter(model =>
    MathUtil.intervalsIntersect({start: model.startYear, end: model.endYear}, criteria.yearInterval))
  // MathUtil.intervalsIntersect({a:model.startYear, b:model.endYear, c:criteria.startYear, d:criteria.endYear})) // future proof, allows addind a prop w/o breaking change
  // MathUtil.intervalsIntersect(model, criteria)) // too much coupling
  console.log("More filtering logic");
  return results;
}

function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect({start: 1000, end: 1600}, {start: 1250, end: 2000}));
}

type IntervalType = { start: number, end: number };
type IntervalTypeMaybe = IntervalType | undefined;

interface Interval { // Json DTO from a Swagger/OpenApi
  start: number;
  end: number;
}

const int: Interval = {start: 500, end: 500};
const int2: IntervalType = {start: 500, end: 500};

class IntervalClass { // Json DTO from a Swagger/OpenApi
  constructor(readonly start: number, readonly end: number) {
  }

  f() {
    console.log("I can add behavior to type 💪 OOP")
  }
}

class IntervalClass2 { // Json DTO from a Swagger/OpenApi
  constructor(readonly start: number, readonly end: number) {
  }

  f() {
    console.log("second behavior")
  }
}

// const intC:IntervalClass={start:500, end:500, f(){}}; // compiles but replaces f() with an empty method
// console.log("Before the experiment")
// intC.f();
const intC = new IntervalClass(500, 500);

function omg(shouldNotWork: IntervalClass2) {
} // SHIT! no other lang compiles this!!
omg(intC);

class MathUtil {
  // static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
  static intervalsIntersect(interval1: Interval, interval2: Interval): boolean {
    return interval1.start <= interval2.end && interval2.start <= interval1.end; // from SO
  }
}

interface CarSearchCriteria {
  // startYear: number,
  // endYear: number;
  yearInterval: Interval;
  make: string;
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
  // const criteria =  (2014, 2018, "Ford");
  const criteria = {yearInterval: {start: 2014, end: 2014}, make: "Ford"}
  const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
  const car2 = new CarModel("Renaul", "Megane", 2019, 2025);
  const initialList = [fordFocusMk2, car2];
  const models = filterCarModels(criteria, initialList);
  console.log("initial: ", initialList);
  console.log("result: ", models);
  expect(models).to.contain(fordFocusMk2);
});

