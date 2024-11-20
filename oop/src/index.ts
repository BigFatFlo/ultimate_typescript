class Account {
    // All properties are public by default
    nickname?: string;

    // We can replace the init code with a better constructor:
    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number
    ) {}

    // The constructor is equivalent to the following:
    // readonly id: number;
    // owner: string;
    // private _balance: number;
    // nickname?: string;

    // constructor(id: number, owner: string, balance: number) {
    //     this.id = id;
    //     this.owner = owner;
    //     this._balance = balance;
    // }

    deposit(amount: number) {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        this._balance += amount;
        this.calculateTax();
    }

    // Getter for property balance
    get balance() {
        return this._balance;
    }

    // Setter for property balance
    // set balance(value: number) {
    //     if (value <= 0) {
    //         throw new Error("Invalid value");
    //     }
    //     this._balance = value;
    // }

    private calculateTax() {
        return this._balance * 0.1;
    }
}

let account = new Account(1, "John Doe", 1000);
console.log(account);
console.log(account.balance);
account.deposit(1000);
console.log(account.balance);

console.log(typeof account);
console.log(account instanceof Account);

// Index signatures
class SeatAssignment {
    // Index signature property
    [seatNumber: string]: string;
}

let seats = new SeatAssignment();
// Now we can add any number of properties to the seats object
seats.A1 = "John";
// We can also do it this way
seats["A1"] = "John";
seats.A2 = "Jane";

// Static members
class Ride {
    private static _activeRides: number = 0;

    start() {
        Ride._activeRides++;
    }

    stop() {
        Ride._activeRides--;
    }

    // Getter for static property activeRides
    static get activeRides() {
        return Ride._activeRides;
    }
}

let ride1 = new Ride();
ride1.start();
console.log(Ride.activeRides);

let ride2 = new Ride();
ride2.start();
console.log(Ride.activeRides);

// Inheritance
class Person {
    constructor(public firstName: string, public lastName: string) {}

    get fullName() {
        return this.firstName + " " + this.lastName;
    }

    walk() {
        console.log("Walking");
    }
}

class Student extends Person {
    constructor(
        firstName: string,
        lastName: string,
        public studentId: number
    ) {
        super(firstName, lastName);
    }

    takeTest() {
        console.log("Taking test");
    }
}

let student = new Student("John", "Doe", 123456);
student.takeTest();
console.log(student.fullName);

// It's actually best practice to have each class in a separate file

// Method overriding
class Teacher extends Person {
    // By default we inherit the Person class constructor
    override get fullName() {
        return "Professor " + super.fullName;
    }
}

let teacher = new Teacher("John", "Doe");
console.log(teacher.fullName);

// Polymorphism
function printNames(people: Person[]) {
    for (const person of people) {
        console.log(person.fullName);
    }
}

printNames([
    new Person("John", "Doe"),
    new Student("Jane", "Doe", 123456),
    new Teacher("James", "Bond"),
]);

class Principal extends Person {
    override get fullName() {
        return "Principal " + super.fullName;
    }
}
// Polymorphism allows us to use the same printNames function even though we added a new class
printNames([new Principal("Mary", "Jane"), new Teacher("James", "Bond")]);

// Open and closed principles
// Classes should be open for extension, but closed for modification
// Once a class is created, we should use inheritance to extend its functionality, not modify it directly

// Protected members
// Protected members are inherited and private members are not

// Abstract classes and methods
abstract class Shape {
    constructor(public color: string) {}

    abstract render(): void;
}

class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }

    override render(): void {
        console.log("Rendering circle");
        // If the render method was not abstract, we could call it like this
        // super.render();
    }
}

let circle = new Circle(10, "red");
circle.render();
// If the shape class was not abstract, we could do this
// let shape = new Shape("blue");
// shape.render();

// Interfaces
// abstract class Calendar {
//     constructor(public name: string) {}

//     abstract addEvent(): void;
//     abstract removeEvent(): void;
// }

// Interfaces are only used by the compiler, no code is generated in the javascript
// Interfaces are used when there is no logic to share between objects
interface Calendar {
    name: string;
    addEvent(): void;
    removeEvent(): void;
}

interface CloudCalendar extends Calendar {
    sync(): void;
}

class GoogleCalendar implements CloudCalendar {
    constructor(public name: string) {}
    sync(): void {
        throw new Error("Method not implemented.");
    }
    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    removeEvent(): void {
        throw new Error("Method not implemented.");
    }
}

// An interface and a type alias can be used interchangeably for objects or classes.
// Usually, we prefer to use an interface after the extends keyword
