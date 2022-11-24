'use strict';

// longer version that does the same thing. Advantage: you can have http and https servers running at the same time

const http = require('http');
// const http = require('https');

// First bring in express
const express = require('express');
// create our app calling the express function
const app = express();

// we need host and port
const port = 3001;
const host = 'localhost';

// server criation
const server = http.createServer(app);
// const servers = https.createServer(app);

// parametrs: root route, callback function. No need for content types.
app.get('/', (req, res) => res.send('<h1>Hello World!!!</h1>'));

server.listen(port, host, () => console.log(`Server ${host}:${port} is running`))

// no need to do res.end()