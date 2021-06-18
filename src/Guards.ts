function computeRegularPay(marine: Marine) {
  let result = marine.yearsService * 100;
  if (marine.awards.length > 0) {
    result += 1000;
  }
  if (marine.awards.length >= 3) {
    result += 2000;
  }
  // much more logic here...
  return result;
}

function getPayAmount(marine: Marine): number {
  if (retrieveDeadStatus()) {
    // some logic here
    return deadAmount();
  } // network call
  if (marine == null) {
    throw new Error("Marine is null");
  }
  if (marine.retired) {
    return retiredAmount();
  }
  if (marine.yearsService == null) {
    throw new Error("Any marine should have the years of service set");
  }
  return computeRegularPay(marine);
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
