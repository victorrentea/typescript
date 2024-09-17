import {expect} from "chai";

function isMatchesYears(criteria: CarSearchCriteria, carYearInterval: Interval): boolean {
  // const interval2 = { // with this syntax you can't populate a class
  //   start: criteria.startYear,
  //   end: criteria.endYear
  // };
  const interval2 = new Interval(criteria.startYear, criteria.endYear);
  return carYearInterval.intersects(interval2);
  // return interval1.intersects(interval2);
}

// global {
//   Array.prototype.intersects = function (other: Array<number>): boolean {
//     return this[0] <= other[1] && other[0] <= this[1];
//   }
// }

/** @deprecated...*/
function filterCarModels(criteria: CarSearchCriteria, models: readonly /*💖*/ CarModel[]): CarModel[] {
  models.intersects([1, 2]);
  // for (let i = 0; i < models.length; i++) {
  //   if (!matchesYears(models[i], criteria)) {
  //     models.splice(i, 1);
  //     i--;
  //   }
  // }

  // this was a REWRITE, not a REFACTOR.
  // we did introduce a functional change: we are NO LONGER REMOVING from the param list.
  // TODO now: trace the callers and see if this change is OK.
  // hopefully you could find the answer without callign the PO.
  // if this a shared library, ! you can't touch this!!!
  // const results = models.filter(model => isMatchesYears(criteria, model.yearInterval));
  const results = models.filter(model => model.matchesCriteria(criteria));
  console.log("More filtering logic");
  return results;
}

// refactoring !== fix bugs
// refactoring !== improving performance(slow thinking mode). but the first 80% of any performance improvement is refactoring
//    you open the code to improve performance only based on numbers. not based on feelings.
// refactoring !== adding behavior
// refactoring === improving readability doing the same (buggy) thing


function applyCapacityFilter() {
  console.log(MathUtil.doIntervalsIntersect({start: 1000, end: 1600}, {start: 1250, end: 2000}));
}

class MathUtil { // collision with others in the same namespace
  // ask chatGPT if there's any library doing this already (among your dependencies :)
  // static doIntervalsIntersect(interval1: Interval, interval2: Interval): boolean {
  // static doIntervalsIntersect(carModel, criteria): boolean { // too coupled to MY flow
  static doIntervalsIntersect(interval1: Interval, interval2: Interval): boolean {
    return interval1.start <= interval2.end &&
      interval2.start <= interval1.end;
  }
}

// type Interval = [number, number]; // OMNG NO!

// type Interval = { start: number, end: number };
// type Interval2 = { center: number } & Interval;
// const i2: Interval2 = {
//   start: 1,
//   end: 2,
//   center: 1.5
// }
// class X implements Interval {
//   start: number = 0;
//   end: number = 0;
// }

// move to interface:
// interface Interval {
//   readonly start: number,
//   readonly end: number,
// //   f: () => void// abstract method
// }
class Interval {
  constructor(public readonly start: number,
              public readonly end: number) {
    if (start > end) throw new Error("start larger than end");
  }

  intersects(other: Interval): boolean {
    return this.start <= other.end && other.start <= this.end;
  }
}

// move class can have behavior inside (methods with body, or constructor)
// 1) if (yearInterval.start > yearInterval.end) {
//       throw new Error("start larger than end");
//     }
// 2) methods/behavior inside.

// in programming, there are only 2 hard things:
// cache invalidation, naming things, and off-by-one errors. -- Phil Karlton

class CarSearchCriteria {
  constructor(public readonly startYear: number,
              public readonly endYear: number,
              public readonly make: string) {
    if (startYear > endYear) throw new Error("start larger than end");
  }
}

// class CarModel implements Interval {// abuse of polymorphism.
// a car IS NOT an interval. it HAS an interval. (property)
class CarModel { // if this is a DTO from JSON you just broke your contract!
  // dangerous structural change.
  // only doable on the WHOLY DOMAIN MODEL! (a set of datastructures hidden from the outside world)
  constructor(public readonly make: string,
              public readonly model: string,
              // public readonly startYear: number,
              // public readonly endYear: number
              public readonly yearInterval: Interval // = -1 attr
  ) {
    if (yearInterval.start > yearInterval.end) {
      throw new Error("start larger than end");
    }
  }

  matchesCriteria(criteria: CarSearchCriteria): boolean {
    return isMatchesYears(criteria, this.yearInterval) && this.make === criteria.make;
  }

}

it('should filter car models', () => {
  const criteria = new CarSearchCriteria(2014, 2018, "Ford");
  const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
  const models = filterCarModels(criteria, [fordFocusMk2]);
  console.log(models);
  expect(models).to.contain(fordFocusMk2);
});

