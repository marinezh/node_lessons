"use strict";

function adapt(item) {
  return Object.assign(item, {
    number: +item.number,
    weightKg: +item.weightKg,
    yearOfBirth: +item.yearOfBirth,
  });
}

module.exports = { adapt };
