function computeRegularPay(marine) {
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
function getPayAmount(marine) {
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
function retrieveDeadStatus() {
    // after 500 millis
    return false;
}
function deadAmount() {
    return 1;
}
function retiredAmount() {
    return 2;
}
class Marine {
    constructor(dead, retired, awards, yearsService) {
        this.dead = dead;
        this.retired = retired;
        this.awards = awards;
        this.yearsService = yearsService;
    }
}
class Award {
}
