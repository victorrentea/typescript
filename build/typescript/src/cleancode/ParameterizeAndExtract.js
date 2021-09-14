"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterizeAndExtract = void 0;
class ParameterizeAndExtract {
    f(n) {
        console.log("Logic F");
        for (let i = 0; i < 4; i++) {
            if (n + i < 0) {
                console.log("Code " + i);
            }
            else {
                throw new Error("BU!");
            }
        }
    }
    g(n) {
        console.log("Logic G");
        this.common(n);
    }
    common(n) {
        for (let j = 0; j < 3; j++) {
            if (n + j < 0) {
                console.log("Code " + j);
            }
            else {
                throw new Error("BU!");
            }
        }
    }
}
exports.ParameterizeAndExtract = ParameterizeAndExtract;
class AnotherClass {
}
