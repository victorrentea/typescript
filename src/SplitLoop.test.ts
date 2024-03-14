import {expect} from 'chai';
import {computeStatsHard, Employee} from './SplitLoop';

it('should compute average employee age and average consultant salary', () => {
    const employees = [
        {id: 1, name: "a", age: 30, isConsultant: false, salary: null},
        {id: 2, name: "a", age: 35, isConsultant: false, salary: null},
        {id: 3, name: "a", age: 40, isConsultant: true, salary: null},
        {id: 4, name: "a", age: 45, isConsultant: true, salary: null},
    ];

    // Mocking the retrieveSalary function
    function retrieveSalary(id: number): number {
        if (id === 3) return 5000;
        if (id === 4) return 6000;
        return -1;
    }

    const expected = 'Average employee age = 32.5';

    expect(computeStatsHard(employees, retrieveSalary)).to.equal(expected);
});

it('should return "Employee(s) not persisted" if any consultant has no ID', () => {
    const employees: Employee[] = [
        {id: 1, name: 'John', age: 30, isConsultant: false, salary: null},
        {id: null, name: 'Jane', age: 40, isConsultant: true, salary: null}];

    expect(computeStatsHard(employees, __ => 1)).to.equal('Employee(s) not persisted');
});

it('should throw an error if any consultant has no salary and retrieveSalary returns null', () => {
    const employees = [
        {id: 1, name: "a", age: 30, isConsultant: false, salary: null},
        {id: 2, name: "a", age: 40, isConsultant: true, salary: null},
    ];

    function retrieveSalary(id: number): number | null {
        return null;
    }

    expect(() => computeStatsHard(employees, retrieveSalary)).to.throw('NO salary found for employee 2');
});