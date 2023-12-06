export type Employee = {
    id: number;
    age: number;
    isConsultant: boolean;
    salary: number | null;
};


export function computeStatsHard(employees: Employee[], retrieveSalary: (employeeId: number) => number): string {
    let totalEmpAge: number = 0;
    const consultantsPaidOver3K: Employee[] = [];
    for (const employee of employees) {
        if (!employee.isConsultant) {
            totalEmpAge += employee.age;
            continue;
        }
        if (employee.id == null) {
            return "Employee(s) not persisted";
        }
        if (employee.salary == null) {
            const salary = retrieveSalary(employee.id);
            if (salary == null) {
                throw new Error("NO salary found for employee " + employee.id);
            } else {
                employee.salary = salary;
            }
        }
        if (employee.salary > 3000) {
            consultantsPaidOver3K.push(employee);
        }
    }

    let averageEmpAge: number = 0;
    if (totalEmpAge != 0) {
        averageEmpAge = totalEmpAge / employees.filter(e => !e.isConsultant).length;
    }
    console.log("some logic with ", consultantsPaidOver3K);
    return "Average employee age = " + averageEmpAge;
}

