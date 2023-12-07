class SearchEngine {

  public filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
    const filteredModels: CarModel[] = []; // Initialize an empty array to store the filtered models
    for (let i = 0; i < models.length; i++) {
      if (MathUtil.intervalsIntersect(models[i].startYear, models[i].endYear, criteria.startYear, criteria.endYear)) {
        filteredModels.push(models[i]);
      }
    }
    console.log("More filtering logic");
    return filteredModels;
  }

  public applyCapacityFilter() {
    console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
  }

}

function applyCapacityFilter() {
  console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
}

class MathUtil {
  static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
    return start1 <= end2 && start2 <= end1; // copiata cu grije din SO
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
  constructor(public make: string,
              public model: string,
              public readonly startYear: number,
              public readonly endYear: number) {
    if (startYear > endYear) {
      throw new Error("start larger than end");
    }
  }
}

const criteria = new CarSearchCriteria(2014, 2018, "Ford");
const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
fordFocusMk2.make = "Mertzan";
// let models = filterCarModels(criteria, [fordFocusMk2]);
// console.log(models);


