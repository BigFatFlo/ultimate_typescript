// Type aliases
type Employee = {
    readonly id: number;
    name: string;
    retire: (date: Date) => void;
}

const employee: Employee = {
    id: 1,
    name: "Flo",
    retire: (date: Date) => {
        console.log(date);
    }
}

// Union types
function kgToLbs(weight: number | string): number {
    if (typeof weight === "number") {
        return weight * 2.2;
    } else {
        return parseInt(weight) * 2.2;
    }
}

kgToLbs(10);
kgToLbs("10kg");

// Intersection types
type Draggable = {
    drag: () => void;
}

type Resizable = {
    resize: () => void;
}

type UIWidget = Draggable & Resizable;

const textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}

// Literal types
type Quantity = 50 | 100;
let quantity: Quantity = 100;

// Nullable types
function greet(name: string | null) {
    if (name) {
        console.log(name.toUpperCase());
    } else {
        console.log("Hello");
    }
}

greet(null);

// Optional chaining
type Customer = {
    birthday: Date;
}

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
// ? = optional property access operator
console.log(customer?.birthday.getFullYear());

// Optional element access operator
let customers: Customer[] = [];
console.log(customers?.[0]?.birthday);

// Optional call operator
let log: any = null;
log?.('a');

let speed: number | null = null;
let ride = {
    // Old javascript way, but speed = 0 would get ignored because evaluated to false
    // speed: speed || 30
    // Nullish coalescing operator: if speed is null or undefined, then 30 is used
    speed: speed ?? 30
}

console.log(ride.speed);

// Type assertions
// phone could be null or HTMLElement
// Type assertion: tell the compiler that phone is actually an HTMLInputElement. No conversion occurs, it's purely informational for the compiler
// If the type is incorrect, the program will throw an error at runtime
let phone = document.getElementById('phone') as HTMLInputElement;
// Another syntax for type assertion:
// let phone = <HTMLInputElement> document.getElementById('phone');
// Now we can access the value property
//phone.value = "123456789";

// Unknown type
// Usin the any type, allows for any method to be called on it, which is not recommended
// function render(document: any) {
//     document.whatever();
// }

// Using the unknown type, the compiler will not allow any method to be called on it
// unless it is asserted to be a certain type
function render(document: unknown) {
    // document.whatever();
    // For primitive types, use typeof
    if (typeof document === "string") {
        console.log(document.toUpperCase());
    }
    // For reference types, use instanceof
    if (document instanceof HTMLElement) {
        document.textContent = "Hi";
    }
}

// Never type
function processEvents(): never {
    while (true) {
        console.log("Processing...");
    }
}

function reject(message: string) {
    throw new Error(message);
}

reject("This is a test");
// This line will never be reached but the compiler will not throw an error because reject is infered to return a void type
processEvents();
// This line will never be reached and the compiler will throw an error because we told it that processEvents() will never return
//console.log("Done");

