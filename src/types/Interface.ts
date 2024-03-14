import {expect} from "chai";


interface Interface {
    readonly a: string;
    readonly b: string;
}

// const incomplete: DtoReceivedFromServer = {a: "a"}; // does not compile

const dto: Interface = {a: "a", b: "b"};
// dto.a = "change"; // does not compile

class DtoReceivedFromServerClass implements Interface{
    readonly a: string;
    readonly b: string; // TODO convert field to ctor param

    constructor(a: string, b: string) {
        this.b = b;
        this.a = a;
    }
}

interface WithC extends Interface {
    readonly c: string;
}
const withC: WithC = {a: "a", b: "b", c: "c"};



