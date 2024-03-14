// existing callers
bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod323(2, 1);


// 100% safe changes: rename of a param, local const/let; extract a function

function bigUglyMethod(discountCode: number, productCount: number) {
    // default params: + for options; -not if the param conditions a lot of logic inside; - not too many
    donkey(productCount, discountCode);
    cow(discountCode);
}

function bigUglyMethod323(discountCode: number, productCount: number) {
    donkey(productCount, discountCode);

    console.log("Some stuff only for CR323 4 " + productCount);
    console.log("Some stuff only for CR323 4 " + productCount);
    console.log("Some stuff only for CR323 4 " + productCount);
    console.log("Some stuff only for CR323 4 " + productCount);

    cow(discountCode);
}

function donkey(productCount: number, discountCode: number) {
    console.log("Donkey Logic 1 " + productCount + " and " + discountCode);
    console.log("Donkey Logic 2 " + productCount);
    console.log("Donkey Logic 3 " + productCount);
    console.log("Donkey Logic 1 " + productCount + " and " + discountCode);
    console.log("Donkey Logic 2 " + productCount);
}
function cow( discountCode: number) {
    console.log("More Cow Logic " + discountCode);
    console.log("More Cow Logic2 " + discountCode);
    console.log("More Cow Logic " + discountCode);
    console.log("More Cow Logic2 " + discountCode);
    console.log("More Cow Logic2 " + discountCode);
}
