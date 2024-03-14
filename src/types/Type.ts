import {expect} from "chai";

type Status = "pending" | "approved" | "rejected"; // "enum"

type StatusExtended = Status | "inProgress"; // Union

type MyType = {
    name: string;
    status: Status;
};

type Death = StatusExtended | MyType;


const myType: MyType = {name: "John", status: "pending"};

const death: Death = {name: "John", status: "pending"};

type StringToInt = (s: string) => number;

// Intersection
type MyTypeWithAge = MyType & {age: number};
const myTypeWithAge: MyTypeWithAge = {name: "John", status: "pending", age: 20};

class MyTypeWithAgeClass implements MyTypeWithAge {
    constructor(readonly name: string,
                readonly status: Status,
                readonly age: number) {
    }
}

// Tuples
type TeamMember = [name: string, role: string, age: number];


const peter: TeamMember = ['Harry', 'Dev', 24];
// const Tom: TeamMember = ['Tom', 30, 'Manager']; //Error: Type 'number' is not assignable to type 'string'.