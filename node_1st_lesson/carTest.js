'use strict';

const cars = require('./cars.json')

console.log(cars);
console.log(cars[0]);
console.log(cars[0].model);
console.log(cars[cars.length - 1].model);

for (const car of cars) {
    console.log(car.model);
}

// print lisens of cars of model Fast GT

for ( const car of cars) {
    if (car.model.toLowerCase() === 'Fast gt') {
        console.log(car.licence);
    }
}

// print all available models. the model is printed only once.
const models = []
for (const car of cars) {
    if (!models.includes(car.model)){
        models.push(car.model);
    }
}

console.log(`Available models : ${models.join(', ')}`);

console.log(car => car.model === 'Fast GT');

const found = []
for (const car of cars) {
    if (car.model === 'Fast GT') {
        found.push(car);
    }
}
console.log(found);