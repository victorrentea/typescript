declare module 'wtf' {
    global {
        interface Array<T> {
            diff(other: T[]): Array<T>;
        }
    }
}

if (!Array.prototype.diff) {
    Array.prototype.diff = function <T>(other: T[]): T[] {
        const hash = new Set(other);
        return this.filter(elem => !hash.has(elem));
    };
}



// ----------------- GOOD: ---------------
class MyArray<T> extends Array<T> {
    diff(other: T[]): T[] {
        const hash = new Set(other);
        return this.filter(elem => !hash.has(elem));
    };
}