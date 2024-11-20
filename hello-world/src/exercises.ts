type User = {
    name: string;
    age: number;
    occupation?: string 
    address?: {
        street: string;
        city: string;
    }
}

let users = [
    {
        name: "John Smith",
        age: 30,
        occupation: "Developer"
    },
    {
        name: "Jane Doe",
        age: 25
    }
]

type Bird = {
    species: string;
    fly: () => void;
}

type Fish = {
    species: string;
    swim: () => void;
}

type Pet = Bird | Fish;

type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

function getUser(): User | null {
    return null;
}
let user = getUser();
console.log(user?.address?.street);

let foo = null;
function bar() {
    return;
}

let x = foo ?? bar();

// In the following code, value is of type unknown, so the method toUpperCase() is not available.
// We could use type narrowing to check if value is actually a string
// let value: unknown = 'a';
// console.log(value.toUpperCase());
