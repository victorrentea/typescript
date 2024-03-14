import {expect} from "chai";

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
  const results = models.filter(model => MathUtil.intervalsIntersect(model.startYear, model.endYear, criteria.startYear, criteria.endYear))
  console.log("More filtering logic");
  return results;
}

function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
}

class MathUtil {
  // namespaced, but more to write than a global function
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

