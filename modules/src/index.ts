import * as Shapes from "./shapes";
import { Product } from "./product";
import Store, { Format } from "./storage";
import { Client, Guest } from "./users";

let circle = new Shapes.Circle(10);
console.log(circle.radius);

let store = new Store();
console.log(store);
console.log(Format);

let product: Product = {
    name: "Laptop",
    price: 1000
}
console.log(product);

let client = new Client();
console.log(client);

let guest = new Guest();
console.log(guest);
