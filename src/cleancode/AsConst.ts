export class X {
    constructor(private _list:string[]) {
    }
    get list(): readonly string[] {
        return this._list;
    }

}

let x = new X(["a","b","c","d"]);
// x.list.splice(1,1);

for (let string of x.list) {
    console.log(string);
}