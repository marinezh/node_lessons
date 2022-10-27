'use strict'

const http = require('http');

const port = 3001;

const host = 'localhost';

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    // response.write('Hello');
    // response.end();
    response.end(JSON.stringify(person));

});

server.listen(port, host, () => console.log(`Server ${host}: ${port} is serving...`));