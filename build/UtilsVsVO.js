class SearchEngine {
    filterCarModels(criteria, models) {
        let result = models.filter(model => new Interval(model.startYear, model.endYear).intersects(criteria.yearInterval));
        console.log("More filtering logic");
        return result;
    }
    applyCapacityFilter() {
        let interval = new Interval(1000, 1600);
        // interval.end = 2;
        console.log(interval.intersects(new Interval(1250, 2000)));
    }
}
function applyCapacityFilter() {
    console.log(new Interval(1000, 1600).intersects(new Interval(1250, 2000)));
}
// class PaginationOptions {
// class TwoIntervals {
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        if (start > end)
            throw new Error("start larger than end");
    }
    intersects(other) {
        return this.start <= other.end && other.start <= this.end;
    }
}
// class MathUtil {
// static intervalsIntersect({start1: number, end1: number, start2: number, end2: number}): boolean { // rau - headless
class CarSearchCriteria {
    constructor(yearInterval, make) {
        this.yearInterval = yearInterval;
        this.make = make;
    }
}
class CarModel {
    constructor(make, model, startYear, endYear) {
        this.make = make;
        this.model = model;
        this.startYear = startYear;
        this.endYear = endYear;
        if (startYear > endYear) {
            throw new Error("start larger than end");
        }
    }
}
let criteria = new CarSearchCriteria(new Interval(2014, 2018), "Ford");
let fordFocusMk2 = new CarModel("Ford", "Focus", 2012, 2016);
// let models = filterCarModels(criteria, [fordFocusMk2]);
// console.log(models);
