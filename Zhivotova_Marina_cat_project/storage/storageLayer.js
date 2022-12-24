"use strict";

const path = require("path");

const { key, adapterFile, storageFile } = require("./storageConfig.json");

const { readStorage, writeStorage } = require("./readerWriter");

const storageFilePath = path.join(__dirname, storageFile);
const { adapt } = require(path.join(__dirname, adapterFile));

console.log("storageFilePath...", storageFilePath);

async function getAllFromStorage() {
  return readStorage(storageFilePath);
}

async function getFromStorage(number) {
  return (
    (await readStorage(storageFilePath)).find((item) => item[key] == number) ||
    null
  );
}

async function addToStorage(newObject) {
  const storageData = await readStorage(storageFilePath);
  storageData.push(adapt(newObject));
  return await writeStorage(storageFilePath, storageData);
}

async function updateStorage(modifiedObject) {
  const storageData = await readStorage(storageFilePath);
  const oldObject = storageData.find(
    (item) => item[key] == modifiedObject[key]
  );
  if (oldObject) {
    Object.assign(oldObject, adapt(modifiedObject));
    return await writeStorage(storageFilePath, storageData);
  }
  return false;
}

async function removeFromStorage(number) {
  const storageData = await readStorage(storageFilePath);
  const i = storageData.findIndex((item) => item[key] == number);
  if (i < 0) return false;
  storageData.splice(i, 1);
  return await writeStorage(storageFilePath, storageData);
}

module.exports = {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  removeFromStorage,
  updateStorage,
};

//tests
// getAllFromStorage().then(console.log).catch(console.log);
// getFromStorage(5).then(console.log).catch(console.log);
// getFromStorage(100).then(console.log).catch(console.log)

// addToStorage({
//   number: 10,
//   name: "Simba",
//   weightKg: 4,
//   yearOfBirth: 2021,
//   breed: "oriental",
// })
//   .then(console.log)
//   .catch(console.log);

// addToStorage({
//     "number": '100',
//     "firstname": "fff",
//     "lastname": "ggg",
//     "department": "hhh",
//     "salary": "5557"
// }).then(console.log).catch(console.log)

removeFromStorage(10).then(console.log).catch(console.log);
