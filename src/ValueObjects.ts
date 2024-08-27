import {expect} from "chai";

function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
// new collection, less noise , FP ftw!
    return models.filter(model => model.getYearInterval().intersect(criteria.getYearInterval()));
}


// type Interval = [number, number];
class Interval {
    constructor(public readonly start: number, public readonly end: number) {
        if (start > end) throw new Error("start larger than end");
    }

    intersect(other: Interval): boolean {
        return this.start <= other.end && other.start <= this.end;
    }
}


class CarSearchCriteria {
    constructor(public readonly startYear: number,
                public readonly endYear: number,
                public readonly make: string) {
        if (startYear > endYear) throw new Error("start larger than end");
    }

    getYearInterval(): Interval {
        return new Interval(this.startYear, this.endYear);
    } // comes from JSON
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

    getYearInterval() {
        return new Interval(this.startYear, this.endYear);
    }
}

it('should filter car models', () => {
    const criteria = new CarSearchCriteria(2014, 2018, "Ford");
    const fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
    const models = filterCarModels(criteria, [fordFocusMk2]);
    console.log(models);
    expect(models).to.contain(fordFocusMk2);
});

