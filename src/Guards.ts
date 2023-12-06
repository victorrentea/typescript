function getPayAmount(marine: Marine,  bonusPackage: BonusPackage): number {
  let result: number;
  if (marine != null && (bonusPackage.value > 100 || bonusPackage.value < 10)) {
    if (!retrieveDeadStatus(marine)) {
      if (!marine.retired) {
        if (marine.yearsService != null) {
          result = marine.yearsService * 100 + bonusPackage.value;
          if (marine.awards && marine.awards.length !== 0) { 
            result += 1000;
          }
          if (marine.awards && marine.awards.length >= 3) {
            result += 2000;
          }
          // HEAVY core logic here, business-rules ...
        } else {
          throw new Error("Any marine should have the years of service set");
        }
      } else result = retiredAmount();
    } else {
      result = deadAmount();
    }
  } else {
    throw new Error("Not applicable!");
  }
  return result;
}

function retrieveDeadStatus(marine:Marine): boolean {
  // after 500 millis
  return false;
}

function deadAmount(): number {
  return 1;
}

function retiredAmount(): number {
  return 2;
}


type Marine ={ dead: boolean,
     retired: boolean,
     awards: Award[],
     yearsService?: number
}
type BonusPackage  = {value: number}

class Award {

}
