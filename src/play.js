export const jsPlay = (x = 1) => {

    let strings = ["a", "b", `${x}`];
    for (let string of strings) {
        console.log("JS: " + string);
    }
    for (let string in strings) {
        console.log("JS: " + string);
    }

    let obj = {a:1, b:2}
    // for (let x of obj) {
    //     console.log("JS: " + x);
    // }
    for (let x in obj) {
        console.log("JS: " + x);
    }

    console.log(new Person("u", "e").getInfo());
    console.log(new Person("u", "e").func()());

    console.log(new SubTeacher("a").getFoo());

    let pets = ["Cat", "Dog", "Parrot"];
    let bugs = ["Ant", "Bee"];

// Creating an array by inserting elements from other arrays
    let animals = [...pets, "Tiger", "Wolf", "Zebra", ...bugs];
    console.log(animals);

    let [first,second] = animals;
    let {a, b} = obj;
    console.log(b);
}



function Person(user,email) {
    this.user = user;
    this.email = email;

    // this.getInfo = function () {
    this.getInfo = () => { // idem
        // return `${user} with ${email}`; // ref to params
        return `${this.user} with ${this.email}`;
    }

    this.func = function () {
        return () => `${user.toUpperCase()} of ${email}`;
        // return function() {return `${this.user} of ${this.email}`};
    }
}

class Teacher {
    constructor(name) {
        this.name = name;
    }
    getArea() {
        return name.toUpperCase();
    }
}
let t = new Teacher("a");
t.name
class SubTeacher extends Teacher {
    constructor() {
        super("a");
    }
    getFoo() { return this.name;}
}


console.log(parseInt(0, 10));
