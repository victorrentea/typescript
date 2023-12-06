
export class X {
    constructor(private readonly _list:string[]) { // readonly field only means not reassignable
    }
    get list(): /*readonly*/ string[] { // TODO uncomment and see .splice below crashing
        return this._list;
    }

}

let x = new X(["a","b","c","d"]);
x.list.splice(1,1);

for (let string of x.list) {
    console.log(string);
}