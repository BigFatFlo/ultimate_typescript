import { calculateTax, calculateTax2 } from "./tax";
// Let's import a pure javascript library
// We need to install @types/lodash to get type information
// https://github.com/DefinitelyTyped/DefinitelyTyped
// npm install --save-dev @types/lodash
// or
// npm i -D @types/lodash
// Some javascript modules, such as chalk, come with their own d.ts files
import * as _ from "lodash";

let tax = calculateTax(1000);
console.log(tax);

let tax2 = calculateTax2(1000);
console.log(tax2);

let numbers = [1, 2, 3, 4, 5];
let sum = _.sum(numbers);
console.log(sum);
