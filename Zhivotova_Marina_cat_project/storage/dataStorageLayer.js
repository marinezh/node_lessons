"use strict";

const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

//Datastorage class

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  }

  getAll() {
    return getAllFromStorage();
  } //end getAll

  getOne(number) {
    return new Promise(async (resolve, reject) => {
      if (!number) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else {
        const result = await getFromStorage(number);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(number));
        }
      }
    });
  } //end of getOne

  insert(cat) {
    return new Promise(async (resolve, reject) => {
      if (cat) {
        if (!cat.number) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getFromStorage(cat.number)) {
          reject(MESSAGES.ALREADY_IN_USE(cat.number));
        } else if (await addToStorage(cat)) {
          resolve(MESSAGES.INSERT_OK(cat.number));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } //end of insert

  update(cat) {
    return new Promise(async (resolve, reject) => {
      if (cat) {
        if (await updateStorage(cat)) {
          resolve(MESSAGES.UPDATE_OK(cat.number));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  } //end update

  remove(number) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else if (await removeFromStorage(number)) {
        resolve(MESSAGES.REMOVE_OK(number));
      } else {
        reject(MESSAGES.NOT_REMOVED(number));
      }
    });
  } //end of remove
};
