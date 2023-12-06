export type Employee = {
    id: number;
    age: number;
    isConsultant: boolean;
    salary: number | null;
};


export function computeStatsHard(employees: Employee[], retrieveSalary: (employeeId: number) => number): string {
    let totalEmpAge: number = 0;
    let totalConsultantSalary: number = 0;
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
        totalConsultantSalary += employee.salary;
    }

    let averageAge: number = 0;
    if (totalEmpAge != 0) {
        averageAge = totalEmpAge / employees.filter(e => !e.isConsultant).length;
    }
    let averageConsultantSalary: number = 0;
    if (totalConsultantSalary != 0) {
        averageConsultantSalary = totalConsultantSalary / employees.length;
    }
    return "Average employee age = " + averageAge + "; Average consultant salary = " + averageConsultantSalary;
}

