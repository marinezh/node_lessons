'use strict';

const { read } = require('./library/utilities');

// read('./iceCreamStorage/iceCreams.json')
//     // .then(result => console.log(result.fileData, result.mime))
//     // .then(result => console.log(result))
//     .then(result => console.log(fileData, mime))
//     .catch(err => console.log(err));

const filePath = './testUtilities.js'

read(filePath).then(console.log).catch(console.log);

