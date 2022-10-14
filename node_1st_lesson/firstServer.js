'use strict'

const http = require('http');

const port = 3000;

const host = 'localhost';

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    response.write('Hello');
    response.end();

});

server.listen(port, host, () => console.log(`Server ${host}: ${port} is serving...`));