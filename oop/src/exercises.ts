class Logger {
    constructor(public filename: string) {}
    writeMessages(messages: string[]): void {
        console.log(`Writing messages ${messages.join(", ")} to ${this.filename}`);
    }
}

class NewPerson {
    constructor(public firstName: string, public lastName: string) {}

    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}

class NewEmployee extends NewPerson {
    constructor(firstName: string, lastName: string, public salary: number) {
        super(firstName, lastName);
    }
}

// Private members are accessible by the class only.
// Protected members are accessible to the class and its subclasses.

interface Address {
    street: string;
    city: string;
    zipCode: number;
}

interface Employee {
    name: string;
    salary: number;
    address: Address;
}
