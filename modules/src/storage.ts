export default class Store {}

export enum Format {
    "RAW",
    "COMPRESSED",
    "ENCRYPTED"
}

class Compressor{}
class Encryptor{}

let compressor = new Compressor();
let encryptor = new Encryptor();
console.log(compressor);
console.log(encryptor);
