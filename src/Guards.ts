// @Valid
function getPayAmount(marine: Marine, bonusPackage: BonusPackage): number {
  const applicable = marine != null && (bonusPackage.value > 100 || bonusPackage.value < 10);
  if (!applicable)
    throw new Error("Not applicable!");

  if (!retrieveDeadStatus(marine)) {
    return deadAmount();
  }
  if (marine.retired) {
    return retiredAmount();
  }
  if (marine.yearsService == null) {
    throw new Error("Any marine should have the years of service set");
  }
  let result: number = marine.yearsService * 100 + bonusPackage.value;
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


const x: string[] = [];
if ([]) console.log("true");
else console.log("false");


class Ex1 extends Error {
  constructor(message: string) {
    super(message);
  }
}

class Ex2 extends Error {
}

function fff() {
  throw new Ex1("");
}

try {
  fff();
} catch (e) {

}


function equal3(tenantType: any) {
  if (!tenantType || tenantType !== "Customer") console.log("TRUE0"); else console.log("FALSE0");
  if (tenantType !== "Customer") console.log("TRUE1"); else console.log("FALSE1");
}

equal3(undefined);
equal3("Customer");
equal3("Else");
equal3(null);

//-----
const tenantLicenses = [];
// const tenantLicenses = [{ applicationId: "QM" }];
// const tenantLicenses = [{ applicationId: "QM" }, { applicationId: "AM" }];
if (!tenantLicenses.length || !tenantLicenses.find(license => license.applicationId === "QM"))
  console.log("TRUEX"); else console.log("FALSEX");
