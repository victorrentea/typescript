import {expect} from "chai";


function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
// new collection, less noise , FP ftw!
    return models.filter(model => model.intersectsCriteriaYears(criteria));
}

function applyCapacityFilter() {
    console.log(MathUtil.intervalsIntersect(1000, 1600, 1250, 2000));
}

class MathUtil {


    static intervalsIntersect(start1: number, end1: number, start2: number, end2: number): boolean {
        return start1 <= end2 && start2 <= end1;
    }
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

    intersectsCriteriaYears(criteria: CarSearchCriteria) {
        return MathUtil.intervalsIntersect(this.startYear, this.endYear, criteria.startYear, criteria.endYear);
    }
}

it('should filter car models', () => {
    const criteria = new CarSearchCriteria(2014, 2018, "Ford");
    const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
    const models = filterCarModels(criteria, [fordFocusMk2]);
    console.log(models);
    expect(models).to.contain(fordFocusMk2);
});

