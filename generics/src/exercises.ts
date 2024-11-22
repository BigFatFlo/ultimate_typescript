function NewEcho<T> (arg: T): T {
    return arg;
}

function printName<T extends {"name": string}> (obj: T) {
    console.log(obj.name);
}

class Entity<T> {
    constructor(public id: T) {}
}

interface User {
    userId: number;
    username: string;
}

//keyof User returns "userId" | "username"