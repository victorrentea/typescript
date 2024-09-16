import {expect} from "chai";

function matchesYears(carModel: CarModel, criteria: CarSearchCriteria): boolean {
  return MathUtil.intervalsIntersect(carModel.startYear, carModel.endYear, criteria.startYear, criteria.endYear);
}

/** @deprecated...*/
function filterCarModels(criteria: CarSearchCriteria, models: readonly /*💖*/ CarModel[]): CarModel[] {
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
  const results = models.filter(model => matchesYears(model, criteria));
  console.log("More filtering logic");
  return results;
}

// refactoring !== fix bugs
// refactoring !== improving performance(slow thinking mode). but the first 80% of any performance improvement is refactoring
//    you open the code to improve performance only based on numbers. not based on feelings.
// refactoring !== adding behavior
// refactoring === improving readability doing the same (buggy) thing


function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
}

class MathUtil { // collision with others in the same namespace
  // ask chatGPT if there's any library doing this already (among your dependencies :)
  static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
    return start1 <= end2 && start2 <= end1;
  }

  static better(interval1: Interval, interval2: Interval): boolean {
    return interval1.start <= interval2.end &&
      interval2.start <= interval1.end;
  }
}

// type Interval = [number, number]; // OMNG NO!
type Interval = { start: number, end: number };

// in programming, there are only 2 hard things:
// cache invalidation, naming things, and off-by-one errors. -- Phil Karlton

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
  const models = filterCarModels(criteria, [fordFocusMk2]);
  console.log(models);
  expect(models).to.contain(fordFocusMk2);
});

