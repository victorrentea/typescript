class Employee {
    constructor(
        private readonly name: string,
        private readonly email: string) {
    }

    // ...
}

// Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
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