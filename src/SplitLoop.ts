export type Employee = {
    id: number | null;
    name: string | null;
    age: number;
    isConsultant: boolean;
    salary: number | null;
};


function retrieveMissingSalariesForConsultants(employees: Employee[], retrieveSalary: (employeeId: number) => (number | null)) {
    for (const employee of employees) {
        if (employee.salary == null) {
            const salary = retrieveSalary(employee.id!);
            if (salary == null) {
                throw new Error("NO salary found for employee " + employee.id);
            } else {
                employee.salary = salary; // Side-effect: change to state
            }
        }
    }
}

export function computeStatsHard(employees: Employee[], retrieveSalary: (employeeId: number) => number | null): string {
    // let totalEmpAge: number = 0;
    // for (const employee of employees) {
    //     if (!employee.isConsultant) {
    //         totalEmpAge += employee.age; // mutation! 🤮
    //     }
    // }

    // totalEmpAge = employees.reduce((acc, e) => acc+(!e.isConsultant?e.age:0),0 )
    // totalEmpAge = employees.filter(e => !e.isConsultant).reduce((acc, e) => acc + e.age, 0)
    const totalEmpAge = employees.filter(e => !e.isConsultant).map(e => e.age).reduce((a, b) => a + b)

    const consultants = employees.filter(e => e.isConsultant);
    // for (const employee of employees) {
    //     if (employee.isConsultant) {
    //         if (employee.id == null) {
    //             return "Employee(s) not persisted";
    //         }
    //     }
    // }
    if (consultants.some(e => e.id == null)) {
        return "Employee(s) not persisted";
    }

    retrieveMissingSalariesForConsultants(consultants, retrieveSalary);
    // const consultantsPaidOver3K: Employee[] = [];
    // for (const employee of employees) {
    //     if (employee.isConsultant) {
    //         if (employee.salary! > 3000) {
    //             consultantsPaidOver3K.push(employee);
    //         }
    //     }
    // }
    const consultantsPaidOver3K = consultants
        // GREED
        // .filter(e => e.isConsultant && e.salary! > 3000)

        //BLUE
        // .filter(e => e.isConsultant)
        .filter(e => e.salary! > 3000)
    ;

    let averageEmpAge: number = 0;
    if (totalEmpAge != 0) {
        averageEmpAge = totalEmpAge / employees.filter(e => !e.isConsultant).length;
    }
    console.log("some logic with ", consultantsPaidOver3K);
    return "Average employee age = " + averageEmpAge;
}

