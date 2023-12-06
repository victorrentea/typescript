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
  biggerUglyMethod(b, a);
}

function bigUglyMethod323(b: number, a: number) {
  biggerUglyMethod(b, a, (a, b) => {
    console.log("Some stuff only for CR323 4 " + a);
  });
}



  // tipic pt platforma ----- 
function biggerUglyMethod( // 1
  b: number,
  a: number,
  callback: (a: number, b: number) => void = (a, b) => { }) {

  donkey(a, b);
  callback(a, b);
  cow(b);
}

function biggerUglyMethod2( // 2
  b: number,
  a: number,
  callback?: (a: number, b: number) => void) {

  donkey(a, b);
  if (callback) callback(a, b);
  cow(b);
}

// preferi asta pt proiectul tau, ecranu 5
enum CazEnum {CAZ1, CAZ2}
function biggerUglyMethodMaiControlat( // 2
  b: number,
  a: number,
  caz: CazEnum) {

  donkey(a, b); // comun

  switch (caz) {
    case CazEnum.CAZ1:
      console.log("CAZ1");
      break;
    case CazEnum.CAZ2:
      console.log("CAZ2");
      break;
  }
  
  cow(b);
}







function donkey(a: number, b: number) {
  console.log("Donkey Logic 1 " + a + " and " + b);
  console.log("Donkey Logic 2 " + a);
  console.log("Donkey Logic 3 " + a);
}

function cow(b: number) {
  console.log("More Cow Logic " + b);
  console.log("More Cow Logic2 " + b);
}

