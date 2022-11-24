'use strict';

const express = require('express');

// create our app calling the express function
const app = express();

// we need to port and host
const port = 3000;
const host = 'localhost';

// parametrs: root route, callback function. No need for content types.
app.get('/', (req, res) => res.send('<h1>Hello World)))</h1>'));

// add listener to the app
app.listen(port, host, () => console.log(`Server ${host}:${port} is running`))