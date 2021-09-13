export class ParameterizeAndExtract {

    public f(n: number) {
        console.log("Logic F");
        for (let i = 0; i < 4; i++) {
            if (n + i < 0) {
                console.log("Code " + i);
            } else {
                throw new Error("BU!");
            }
        }
    }
    public g(n: number) {
        console.log("Logic G");
        this.common(n);
    }

    private common(n: number) {
        for (let j = 0; j < 3; j++) {
            if (n + j < 0) {
                console.log("Code " + j);
            } else {
                throw new Error("BU!");
            }
        }
    }
}

class AnotherClass {

}
