//  Decorator
function Component(constructor: Function) {
    console.log("Component decorator called");
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDOM = () => {
        console.log(`Inserting ${constructor.name} in the DOM`);
    }
}

@Component
class ProfileComponent {
}

// Parameterized Decorator
type ComponentOptions = {
    selector: string;
}

// This is a decorator factory
function ComponentWithParam(options: ComponentOptions) {
    return (constructor: Function) => {
        console.log("Component decorator called");
        constructor.prototype.options = options;
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log(`Inserting ${constructor.name} in the DOM`);
        }
    }
}

// This creates the decorator and applies it to the class
@ComponentWithParam({selector: '#my-profile'})
class OtherComponent {
}

// Decorator Composition
function Pipe(constructor: Function) {
    console.log("Pipe decorator called");
    constructor.prototype.pipe = true;
}

// Decorators are applied in reverse order, Pipe first here
@Component
@Pipe
class ComposedComponent {
}

// Method decorators
// The function signature has to match this one to be used as a method decorator
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log("Method decorator called");
    console.log("Target is prototype:", target === Person.prototype);
    console.log("Target constructor name:", target.constructor.name);
    console.log("Properties on target:", Object.getOwnPropertyNames(target));
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
    // We can replace the method implementation completely
    const original = descriptor.value as Function;
    // Here we have to use function syntax and not arrow function,
    // because arrow function doesn't define its own "this" context
    descriptor.value = function(...args: any) {
        console.log("before");
        original.call(this, ...args);
        console.log("after");
    }
}

class Person {
    constructor(public name: string) {
    }

    @Log
    say(message:string) {
        console.log(`${this.name} says ${message}`);
    }
}

let person = new Person("John");
person.say("Hello");

// Accessor (getter/setter) decorators

function Capitalize(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator called");
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
    // For an accessor, we can't use descriptor.value, we have to use descriptor.get
    const original = descriptor.get;
    descriptor.get = function() {
        const result = original?.call(this);
        return (typeof result === 'string') ? result.toUpperCase() : result;
    }
}

class NewPerson{
    constructor(public firstName: string, public lastName: string) {}

    @Capitalize
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

let newPerson = new NewPerson("John", "Doe");
console.log(newPerson.fullName);

// Property decorators
function MinLength(length: number) {
    return (target: any, propertyName: string) => {
        console.log("Property decorator called");
        console.log(target);
        console.log(propertyName);
        let value: string;
        const descriptor: PropertyDescriptor = {
            get() {return value;},
            set(newValue: string) {
                if (newValue.length < length) {
                    throw new Error(`${propertyName} must be at least ${length} characters long`);
                }
                value = newValue;
            }
        }

        Object.defineProperty(target, propertyName, descriptor);
    }
}

class User {
    @MinLength(4)
    password: string;

    constructor(password: string) {
        this.password = password;
    }
}

let user = new User("1234");
console.log(user.password);
// This throws an error
// user.password = "123";

// Parameter decorators
type WatchedParameter = {
    methodName: string;
    parameterIndex: number;
}

const watchedParameters: WatchedParameter[] = [];

function Watch(target: any, methodName:string, parameterIndex: number) {
    console.log("Parameter decorator called");
    console.log(target);
    console.log(methodName);
    console.log(parameterIndex);
    watchedParameters.push({methodName, parameterIndex})
}

class Vehicle {
    move(@Watch speed: number) {
        console.log(`Moving at ${speed} km/h`);
    }
}

console.log(watchedParameters);