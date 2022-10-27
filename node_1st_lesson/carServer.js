"use strict";

const http = require("http");

const storage = require("./carStorage");

// console.log(storage.getAllCars()); // just for test

const port = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Conent-Type": "text/html; charset=utf-8" });
    res.end(createHTMLPage(storage.getAllCars()));
    res.end(createHTMLPage(storage.getAllCars()));
    
});

server.listen(port, host, () =>
  console.log(`Server ${host} ${port} is running...`)
);

function createHTMLPage(cars) {
    let htmlString = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset = "utf-8">
            <title>Car Data</title>
             <style>   
                h1{
                color: green;
                }
             </style>
         </head>
    <body>
    <h1>Cars</h1>`;
    for (const car of cars) {
        htmlString += `<h2> ${car.model}: ${car.licence}</h2>`
    }
    htmlString+= `      </body>
    </html>`;

    return htmlString;
}


 

