// existing callers
bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod(2, 1, true);


function bigUglyMethod(b: number, a: number, boulean: boolean = false) {
  console.log("Donkey Logic 1 " + a + " and " + b);
  console.log("Donkey Logic 2 " + a);
  console.log("Donkey Logic 3 " + a);

  if (boulean) {
    console.log("Some stuff only for CR323 4 " + a);
  }

  console.log("More Cow Logic " + b);
  console.log("More Cow Logic2 " + b);
}

