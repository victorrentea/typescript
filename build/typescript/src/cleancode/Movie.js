"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.MovieCategory = void 0;
var MovieCategory;
(function (MovieCategory) {
    MovieCategory["REGULAR"] = "REGULAR";
    MovieCategory["NEW_RELEASE"] = "NEW_RELEASE";
    MovieCategory["CHILDREN"] = "CHILDREN";
    // ,    BABACI = "BABACI"
})(MovieCategory = exports.MovieCategory || (exports.MovieCategory = {}));
class Movie {
    constructor(title, category) {
        this.title = title;
        this.category = category;
        if (!category)
            throw new Error();
    }
    isNewRelease() {
        return this.category == MovieCategory.NEW_RELEASE;
    }
}
exports.Movie = Movie;
class MyException extends Error {
}
