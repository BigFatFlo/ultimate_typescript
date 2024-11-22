// Generic classes
class KeyValuePair<K, V> {
    constructor(public key: K, public value: V) {
    }
}

let pair = new KeyValuePair<number, string>(1, "apple");
let infered_pair = new KeyValuePair("1", 3);

// Generic functions
function wrapInArray<T>(value: T) {
    return [value];
}

let strings = wrapInArray("1");
let numbers = wrapInArray(1);
let booleans = wrapInArray(true);

class ArrayUtils {
    static wrapInArray<T>(value: T) {
        return [value];
    }
}

numbers = ArrayUtils.wrapInArray(1);

// Generic interfaces
interface Result<T> {
    data: T | null;
    error: string | null;
}

function fetch<T>(url: string): Result<T> {
    return {data: null, error: null};
}

interface User {
    username: string;
}

let result = fetch<User>("url");
console.log(result.data?.username);

// Generic constraints
function echo<T extends number | string>(value: T): T {
    return value;
}

// This will throw an error
// echo(true);

function echo2<T extends {name: string}>(value: T): T {
    return value;
}

echo2({name: "John"});

interface Person {
    name: string;
}

function echo3<T extends Person>(value: T): T {
    return value;
}

echo3({name: "John"});

// Same thing with classes and subclasses

// Extending generic classes
interface Product {
    name: string;
    price: number;
}

class Store<T> {
    protected _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj);
    }
}

// Extending generic class
class CompressibleStore<T> extends Store<T> {
    compress() {}
}

let store = new CompressibleStore<Product>();
store.add({name: "product1", price: 10});
store.compress();

// Restricting type parameter
class SearchableStore<T extends {name: string}> extends Store<T> {
    find(name: string): T | undefined {
        return this._objects.find(obj => obj.name === name);
    }
}

// Fix (terminate) the generic type parameter
class ProductStore extends Store<Product> {
    filterByCategory(category: string): Product[] {
        return [];
    }
}

// keyof operator

class NewStore<T> {
    protected _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj);
    }

    // If T is Product, then keyof T is "name" | "price"
    find(property: keyof T, value: unknown): T | undefined {
        return this._objects.find(obj => obj[property] === value);
    }
}

let store2 = new NewStore<Product>();
store2.add({name: "product1", price: 10});
store2.find("name", "product1");
store2.find("price", 10);
// Without keyof operator in find method, this will compile but crash at runtime
// store2.find("nonExistingProperty", "value")

// Type mapping
// We create a readonly version of Product
type ReadOnlyProduct = {
    readonly [K in keyof Product]: Product[K];
}

// We can make it generic:
type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
}

let product: ReadOnlyProduct = {name: "product1", price: 10};
let product2: ReadOnly<Product> = {name: "product1", price: 10};

// We can also make properties optional in the same way:
type Optional<T> = {
    [K in keyof T]?: T[K];
}

let product3: Optional<Product> = {name: "product1"};

// We can also make them nullable for instance:
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

let product4: Nullable<Product> = {name: "product1", price: null};

// All these types are actually useful so they are built-in in TypeScript as Utility Types