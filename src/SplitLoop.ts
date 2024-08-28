export type Employee = {
    id: number | null;
    name: string | null;
    age: number;
    isConsultant: boolean;
    salary: number | null;
};


export function computeStatsHard(employees: Employee[], retrieveSalary: (employeeId: number) => number | null): string {
    const consultantsPaidOver3K: Employee[] = [];

    // for (const employee of employees) {
    //     if (employee.isConsultant) {
    //         if (employee.id == null) {
    //             return "Employee(s) not persisted";
    //         }
    //     }
    // }
    if (employees.find(e => e.isConsultant && e.id == null))
        return "Employee(s) not persisted";



    const totalEmpAge = employees.filter(e => !e.isConsultant)
        .reduce((total, e) => total + e.age, 0); // A

    // .map(e => e.age)
    // .reduce((a, b) => a + b, 0); // B
    // .reduce(sum, 0); // B


    for (const employee of employees) {
        if (employee.isConsultant) {
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
    }

    // debate: performance: how many elements are in the employees list?
    // 100 -> not a problem
    // 1M -> problem. BUT! where did that 1M come from? DB/API?
    //    then bringing in that amount of data took an eternity. relative impact of my extra for = 0.0000001

    let averageEmpAge: number = 0;
    if (totalEmpAge != 0) {
        averageEmpAge = totalEmpAge / employees.filter(e => !e.isConsultant).length;
    }
    console.log("some logic with ", consultantsPaidOver3K);
    return "Average employee age = " + averageEmpAge;
}

