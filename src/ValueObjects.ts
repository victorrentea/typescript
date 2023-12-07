// x = new SearchEngine();
// x.filterCarModels = 'tzeapa';
class SearchEngine {

  public filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
    const criteriaInterval = new Interval(criteria.startYear, criteria.endYear);
    return models.filter(it => new Interval(it.startYear, it.endYear).intersects(criteriaInterval));
  }

  public applyCapacityFilter() {
    console.log(new Interval(1000, 1600).intersects(new Interval(1250, 2000)));
  }

}

class Interval {
  constructor(
    public start: number,
    public end: number) {
      if (start > end) throw new Error("start larger than end");
    }
    
  // 😏😎
  intersects = (other: Interval)=> this.start <= other.end && other.start <= this.end
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
const criteriaDeTesterCreativ = new CarSearchCriteria(2022, 2019, "Ford");
const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
fordFocusMk2.make = "Mertzan";
// let models = filterCarModels(criteria, [fordFocusMk2]);
// console.log(models);


