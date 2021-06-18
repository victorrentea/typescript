
export enum MovieCategory {
    REGULAR = "REGULAR",
    NEW_RELEASE = "NEW_RELEASE",
    CHILDREN = "CHILDREN"
    // ,    BABACI = "BABACI"
}

export class Movie {
    constructor(public readonly title: string,
                public readonly category: MovieCategory) {
        if (!category) throw new Error();
    }

    isNewRelease() {
        return this.category == MovieCategory.NEW_RELEASE;
    }
}

class MyException extends Error {

    // public static withCode(code:CodEnum?=GENERAL, message:string):MyException {
    //
    // }
}