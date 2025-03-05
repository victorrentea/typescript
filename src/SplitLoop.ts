export type Employee = {
  id: number | null;
  name: string | null;
  age: number;
  isConsultant: boolean;
  salary: number;
};


export function computeStatsHard(employees: Employee[], retrieveSalary: (employeeId: number) => number | null): string {
  const totalEmpAge = employees
    .filter(e => !e.isConsultant)
    .map(e => e.age)
    .reduce((a, b) => a + b);

  const consultantsPaidOver3K = employees.filter(e => e.isConsultant && e.salary > 3000);


  let averageEmpAge: number = 0;
  if (totalEmpAge != 0) {
    averageEmpAge = totalEmpAge / employees.filter(e => !e.isConsultant).length;
  }
  console.log("some logic with ", consultantsPaidOver3K);
  return "Average employee age = " + averageEmpAge;
}

