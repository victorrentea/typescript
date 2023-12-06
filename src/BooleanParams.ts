// existing callers
bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod323(2, 1);


// Single Responsibility Principle violation
function bigUglyMethod(b: number, a: number) {
  donkey();
  cow();
}
function bigUglyMethod323(b: number, a: number) {
  donkey();
  console.log("Some stuff only for CR323 4 " + a);
  cow();
}
function cow() {
  console.log("More Cow Logic " + b);
  console.log("More Cow Logic2 " + b);
}
function donkey() {
  console.log("Donkey Logic 1 " + a + " and " + b);
  console.log("Donkey Logic 2 " + a);
  console.log("Donkey Logic 3 " + a);
}

