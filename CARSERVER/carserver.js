'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const storage = require('./carStorage');

const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(`http://${req.headers.host}${req.url}`);
    
    let resultHTML = '';
    if (pathname === '/cars') {
        result = createCarsHTML(storage.getAllCars());
    } else {
        res.end(); // this will be changed later
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(resultHTML);
});   
      
server.listen(port, host,
    () => console.log(`server ${port}, ${host} is running...`));
    
function createCarsHTML(carArray) {
    return carArray;
    return `<pre>`
    }