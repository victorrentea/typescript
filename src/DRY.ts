function f(n: number) {
    console.log("Logic F");
    for (let i = 0; i < 4; i++) {
        if (n + i < 0) {
            console.log("Code " + i);
        } else {
            throw new Error("BU!");
        }
    }
}
function g(n: number) {
    console.log("Logic G");
    for (let j = 0; j < 3; j++) {
        if (n + j < 0) {
            console.log("Code " + j);
        } else {
            throw new Error("BU!");
        }
    }
}

