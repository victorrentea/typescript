function getPayAmount(marine: Marine): number {
  let result: number;
  if (!retrieveDeadStatus()) { // network call
    if (marine != null) {
      if (!marine.retired) {
        if (marine.yearsService != null) {
          result = marine.yearsService * 100;
          if (marine.awards.length > 0) {
            result += 1000;
          }
          if (marine.awards.length >= 3) {
            result += 2000;
          }
          // much more logic here...
        } else {
          throw new Error("Any marine should have the years of service set");
        }
      } else result = retiredAmount();
    } else {
      throw new Error("Marine is null");
    }
  } else {
    // some logic here
    result = deadAmount();
  }
  return result;
}

function retrieveDeadStatus(): boolean {
  // after 500 millis
  return false;
}

function deadAmount(): number {
  return 1;
}

function retiredAmount(): number {
  return 2;
}


class Marine {
  constructor(
    public readonly dead: boolean,
    public readonly retired: boolean,
    public readonly awards: Award[],
    public readonly yearsService?: number,
  ) {

  }


}

class Award {

}
