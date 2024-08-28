function getPayAmount(marine: Marine, bonusPackage: BonusPackage): number {
    if (marine == null)
        throw new Error("Not applicable!");
    if (bonusPackage.value <= 100 && bonusPackage.value >= 10)
        throw new Error("Not applicable!");
    if (retrieveDeadStatus(marine)) {
        return deadAmount();
    }
    if (marine.retired) {
        return retiredAmount();
    }
    if (marine.yearsService == null) {
        throw new Error("Any marine should have the years of service set");
    }
    let result: number;
    result = marine.yearsService * 100 + bonusPackage.value;
    if (marine.awards && marine.awards.length !== 0) {
        result += 1000;
    }
    if (marine.awards && marine.awards.length >= 3) {
        result += 2000;
    }
    // HEAVY core logic here, business-rules ...
    return result;
}

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
