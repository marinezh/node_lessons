"use strict";

const storage  = require("./carStorage");

console.log(storage.getAllCars());
console.log(storage.getAllModels());
console.log(storage.getCar("model", "Fast GT"));
console.log(storage.getCar("licence", "A-1"));
console.log(storage.getCar("model", "x"));
console.log(storage.getCar("model"));
console.log(storage.getCar("x", "x"));