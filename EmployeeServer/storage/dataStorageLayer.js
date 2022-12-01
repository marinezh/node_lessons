'use strict';

const { CODES, MESSAGES } = require('./statusCodes')

const {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    removeFromStorage,
    updateStorage
} = require('./storageLayer')

//datastorage class

module.exports = class Datastorage {
    get CODES() {
        return CODES;
    }

    getAll() {
        return getAllFromStorage();

    }//end get all

    getOne(id) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'))
            }
            else {
                const result = await getFromStorage(id);
                if (result) {
                    resolve(result);
                } else {
                    reject(MESSAGES.NOT_FOUND(id))
                }
            }
        })
    } // end getOne

    insert(employee) {
        return new Promise(async (resolve, reject) => {
            if (employee) {
                if (!employee.id) {
                    reject(MESSAGES.NOT_INSERTED())
                }
                else if (await getFromStorage(employee.id)) {
                    reject(MESSAGES.ALREADY_IN_USE(employee.id))
                }
                else if (await addToStorage(employee.id)) {
                    resolve(MESSAGES.INSERT_OK(id))
                }
                else {
                    reject(MESSAGES.NOT_INSERTED())
                }
            }
        })
    } //end of insert

    update(employee) {
        return new Promise(async (resolve, reject) => {
            if (employee) {
                if (await updateStorage(employee)) {
                    resolve(MESSAGES.UPDATE_OK(employee.id))
                }
                else {
                    reject(MESSAGES.NOT_UPDATED)
                }
            } else {
                reject(MESSAGES.NOT_UPDATED());
            }
        })
    } //end of update

    remove(id) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'))
            }
            else if (await removeFromStorage(id)) {

            }
        })
    } //end of update
}