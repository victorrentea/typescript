// existing callers
bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod(2, 1, true);


// 100% safe changes: rename of a param, local const/let; extract a function
function bigUglyMethod(discountCode: number, productCount: number, boulean: boolean = false) {
  console.log("Donkey Logic 1 " + productCount + " and " + discountCode);
  console.log("Donkey Logic 2 " + productCount);
  console.log("Donkey Logic 3 " + productCount);

  if (boulean) {
    console.log("Some stuff only for CR323 4 " + productCount);
  }

  console.log("More Cow Logic " + discountCode);
  console.log("More Cow Logic2 " + discountCode);
  const x = 1;
}
