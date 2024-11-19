// Variables
let sales = 123_456_789;
let course = "Typescript";
let is_published = true;
// Avoid using any type
let level;
level = 1;
level = "text";

// Arrays
let numbers: number[] = [1, 2, 3];
let array = [];
array[0] = 1;
array[1] = "text";

console.log(sales, course, is_published, level);

// Error if we don't specify the type "any"
function render(document: any) {
    console.log(document);
} 

render("Hello");

// Tuples
let user: [number, string] = [1, "Flo"];

console.log(user);

// Unfortunately this is allowed because a tuple in typescript is an array in javascript
user.push(2);
console.log(user);

const constant = 1;

// Enums
enum Size {Small = 1, Medium, Large}
// Declaring an enum as a constant results in a more efficient compiled code
const enum CustomSize {Small = 'S', Medium = 'M', Large = 'L'}

let mySize: Size = Size.Medium;
let myCustomSize: CustomSize = CustomSize.Medium;

console.log(mySize, myCustomSize);

// Functions

// Old way of using an optional parameter
function calculateTaxOld(income: number, taxYear?: number): number {
    let x = 1;
    // Old way of checking if taxYear is undefined
    if ((taxYear || 2022) < 2022 && income < 50_000) {
        return income * x * 0.2;
    }
    // By default, the function returns undefined
    return income * 0.4;
}

// Better way of using an optional parameter
function calculateTax(income: number, taxYear: number = 2022): number {
    let x = 1;
    if (taxYear < 2022 && income < 50_000) {
        return income * x * 0.2;
    }
    // By default, the function returns undefined
    return income * 0.4;
}

calculateTax(10_000, 2022);

// Objects
// In typescript, we can't add fields to an object after it's created
let employee: {
    readonly id: number;
    name: string;
    fax?: string;
    retire: (date: Date) => void;
} = {
    id: 1,
    name: "Flo",
    retire: (date: Date) => {
        console.log(date);
    }
}

// Forbidden by typescript
// employee.id = 2;
employee.name = "John";
employee.fax = "123456789";
employee.retire(new Date());