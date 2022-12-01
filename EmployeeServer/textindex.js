"use strict";

const Datastorage = require("./storage/dataStorageLayer")

const storage = new Datastorage();

// storage.getAll().then(console.log).catch(console.log)
storage.getAll(2).then(console.log).catch(console.log)

    (async () => {
        try {
            const result = await storage.getOne();
            console.log(result);
        } catch (err) {
            console.log(err);
            if (err.code === storage.CODES.NOT_FOUND) {
                console.log('this is missing');
            }
        }


    })

const status = await storage.insert({


})