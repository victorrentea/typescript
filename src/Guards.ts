function doComputePayroll(marine: Marine, bonusPackage: BonusPackage): number {
  let result = marine.yearsService * 100 + bonusPackage.value;
  if (marine.awards && marine.awards.length !== 0) {
    result += 1000;
  }
  if (marine.awards && marine.awards.length >= 3) {
    result += 2000;
  }
  // HEAVY core logic here, business-rules ...
  return result;
}

function getPayAmount(marine: Marine, bonusPackage: BonusPackage): number {
  marine = marine || null; // if marine is undefined, null[, 0, {},]  => null
  // if (!(marine != null && (bonusPackage.value > 100 || bonusPackage.value < 10))) {
  // if (!(marine != null && b)) {
  // if (!(marine != null) || (!b)) {
  // if (marine == null) {
  //   throw new Error("Not applicable!");
  // }
  // guard conditions
  if (marine == null || !(bonusPackage.value > 100 || bonusPackage.value < 10)) {
    throw new Error("Not applicable!"); // early throw
  }
  if (retrieveDeadStatus(marine)) {
    return deadAmount(); // early return
  }
  if (marine.retired) {
    return retiredAmount();
  }
  if (marine.yearsService == null) {
    throw new Error("Any marine should have the years of service set");
  }
  return doComputePayroll(marine, bonusPackage);
}

// this leads to multiple returns in the same function.
// if >= 5 => split the function
// seasoned C++ developers are more inclined to use nested if statements.
// have only 1 return statement in a function!!!! - the law!
// - because in a function of 80 lines (BAD), it's hard to find the returns

// defensive programming (aka paranoid programming) = checking all possible aberrant inputs:
// undefined vs null vs "" vs " " vs 0 vs NaN vs false vs true vs [] vs {}
// AT THE START of each lambda at boundaries!

getPayAmount(0, null); // does not transpile, but accepts the null in the end JS code.

function retrieveDeadStatus(marine: Marine): boolean {
  // after 500 millis
  return false;
}

function deadAmount(): number {
  return 1;
}

function retiredAmount(): number {
  return 2;
}


type Marine = {
  dead: boolean,
  retired: boolean,
  awards: Award[],
  yearsService?: number
}
type BonusPackage = { value: number }

class Award {

}
