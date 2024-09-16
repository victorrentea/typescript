import {expect} from "chai";

function matchesYears(carModel: CarModel, criteria: CarSearchCriteria): boolean {
  return MathUtil.intervalsIntersect(carModel.startYear, carModel.endYear, criteria.startYear, criteria.endYear);
}

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
  for (let i = 0; i < models.length; i++) { // if you think you find a BUG while refactoring, DON'T FIX IT! (especially n old code)
    // PO said it's a bug, but users complained about it, so we kept and cherished THE BUG!
    // for (let i = models.length-1; i>=0;i--) { // correct
    if (!matchesYears(models[i], criteria)) {
      models.splice(i, 1);
      i--; // life-savior!
    }
  }
  console.log("More filtering logic");
  return models;
}

// refactoring !== fix bugs
// refactoring !== improving performance(slow thinking mode). but the first 80% of any performance improvement is refactoring
//    you open the code to improve performance only based on numbers. not based on feelings.
// refactoring !== adding behavior
// refactoring === improving readability doing the same (buggy) thing


function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
}

class MathUtil {
  static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
    return start1 <= end2 && start2 <= end1;
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
  const models = filterCarModels(criteria, [fordFocusMk2]);
  console.log(models);
  expect(models).to.contain(fordFocusMk2);
});

