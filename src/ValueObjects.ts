import {expect} from "chai";


// default GO-TO: create a new function to hide the garbage in
// function intersectIntervals(model: CarModel, criteria: CarSearchCriteria): boolean {
//    return MathUtil.intervalsIntersect(model.startYear, model.endYear, criteria.startYear, criteria.endYear);
// }
function filterCarModels(criteria: CarSearchCriteria, models: CarModel[]): CarModel[] {
    // slightly more complicated as I have a variable keeping a function
    const results = models.filter(model => MathUtil.intervalsIntersect(
        model.yearInterval,criteria.yearInterval))
    console.log("More filtering logic");
    return results;
}

function applyCapacityFilter() {
    console.log(MathUtil.intervalsIntersect({start: 1000, end: 1600}, {start: 1250, end: 2000}));
}

type Interval = { start: number, end: number }

class MathUtil {
    // namespaced, but more to write than a global function
    static intervalsIntersect(interval1: Interval, interval2: Interval): boolean {
        return interval1.start <= interval2.end && interval2.start <= interval1.end;
    }
}


class CarSearchCriteria {
    constructor(public readonly yearInterval: Interval,
                public readonly make: string) {
        if (yearInterval.start > yearInterval.end) {
            throw new Error("start larger than end");
        }
    }
}

class CarModel {
    constructor(public readonly make: string,
                public readonly model: string,
                public readonly yearInterval: Interval //!WARNING: you can't do this on DTOs from server
                ) {
        if (yearInterval.start > yearInterval.end) {
            throw new Error("start larger than end");
        }
    }
}

it('should filter car models', () => {
    const criteria = new CarSearchCriteria({start:2014, end:2018}, "Ford");
    const fordFocusMk2 = new CarModel("Ford", "Focus", {start:2012, end:2016});
    const models = filterCarModels(criteria, [fordFocusMk2]);
    console.log(models);
    expect(models).to.contain(fordFocusMk2);
});

