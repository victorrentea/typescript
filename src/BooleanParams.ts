// existing callers
bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod(2, 1);


function bigUglyMethod(b: number, a: number) {
  console.log("Complex Logic 1 " + a + " and " + b);
  console.log("Complex Logic 2 " + a);
  console.log("Complex Logic 3 " + a);

  console.log("Some stuff only for CR323 4 " + a);

  console.log("More Complex Logic " + b);
  console.log("More Complex Logic2 " + b);
}

