class Employee {
    constructor(
        private readonly name: string,
        private readonly email: string) {
    }

    // ...
}

// Bad because Employees "have" tax data.
// Employees "are" NOT ..TaxData. EmployeeTaxData is not a subtype of Employee
class EmployeeTaxData extends Employee {
    constructor(
        name: string,
        email: string,
        private readonly ssn: string,
        private readonly salary: number) {
        super(name, email);
    }

    // ...
}