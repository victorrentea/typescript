import { expect } from 'chai';
import { computeStatsHard } from '../src/SplitLoop';

describe('SplitLoop', () => {
  it('should compute average employee age and average consultant salary', () => {
    const employees = [
      { id: 1, age: 30, isConsultant: false, salary: null },
      { id: 2, age: 35, isConsultant: false, salary: null },
      { id: 3, age: 40, isConsultant: true, salary: null },
      { id: 4, age: 45, isConsultant: true, salary: null },
    ];

    // Mocking the retrieveSalary function
    function retrieveSalary(id: number): number  {
      if (id === 3) return 5000;
      if (id === 4) return 6000;
      return null;
    }

    const expected = 'Average employee age = 32.5; Average consultant salary = 5500';

    expect(computeStatsHard(employees, retrieveSalary)).to.equal(expected);
  });

it('should return "Employee(s) not persisted" if any consultant has no ID', () => {
    const employees = [
        { id: 1, name: 'John', age: 30, isConsultant: false, salary: null },
        { id: null, name: 'Jane', age: 40, isConsultant: true, salary: null },
    ];

    expect(computeStatsHard(employees, __ => 1)).to.equal('Employee(s) not persisted');
});

  it('should throw an error if any consultant has no salary and retrieveSalary returns null', () => {
    const employees = [
      { id: 1, age: 30, isConsultant: false, salary: null },
      { id: 2, age: 40, isConsultant: true, salary: null },
    ];

    function retrieveSalary(id: number): number | null {
      return null;
    }

    expect(() => computeStatsHard(employees, retrieveSalary)).to.throw('NO salary found for employee 2');
  });
});