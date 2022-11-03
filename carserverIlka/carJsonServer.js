"use strict";

const http = require("http");

const { port, host } = require("./config.json");

// const storage = require("./carStorage");
const { getAllCars, getAllModels, getCar } = require("./carStorage");

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    `http://${req.headers.host}${req.url}`
  );

  console.log(pathname);
  const route = decodeURIComponent(pathname);

  let result = [];
  if (route === "/cars") {
      result = getAllCars();
      
  } else if (route === "/cartypes") {
      result = getAllModels();
      
  } else if (pathname === "/search/bylicence") {
      result = getCar('licence', searchParams.get('value'))
      
  } else if (pathname === "/search/bymodel") {
    result = getCar('model', searchParams.get('value'))
 
  } else {
    result={message:'not found'}
  }

    res.writeHead(200, {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*'
    });
    res.end(JSON.stringify(result, null,2));

  // console.log('route:', route);
  // if (pathname === '/äåö') {
  // console.log('adad');
  // } else if(pathname === '/%C3%A4%C3%A5%C3%B6') {
  //     console.log('smth');
  // }

  // res.end()

  //   let resultHtml = "";
  //   if (pathname === "/cars") {
  //       resultHtml = createCarsHtml(storage.getAllCars());

  //   } else if (pathname === "/cartypes") {
  //       resultHtml = createCarTypes(storage.getAllModels());

  //   } else if (pathname === "/search/bylicence") {
  //       const value = searchParams.get('value');

  //       resultHtml = createCarsHtml(storage.getCar('licence', value));

  //   } else if (pathname === "/search/bymodel") {
  //     const value = searchParams.get('value');

  //     resultHtml = createCarsHtml(storage.getCar('model', value));

  //   } else {
  //     res.end(); //this will be changed later
  //   }

  //   res.writeHead(200, {
  //     "Content-Type": "text/html;charset=utf-8",
  //   });
  //   res.end(resultHtml);
});

server.listen(port, host, () => console.log(`${host}:${port} running...`));

// function createCarsHtml(carArray) {
//   let htmlString = `<!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">

//       <title>Cars</title>
//   </head>
//   <body>
//       <h1>Search result</h1>`;

//   if (carArray.length === 0) {
//     htmlString += "<h2>No cars found</h2>";
//   } else {
//     htmlString += `<table>
//     <thead>
//         <tr>
//             <th>Model</th>
//             <th>Licence</th>
//         </tr>
//     </thead>
//     <tbody>

//    `;
//     for (const car of carArray) {
//       htmlString += `<tr>
//             <td>${car.model} </td>
//             <td>${car.licence} </td>

//             </tr>`;
//     }

//     htmlString += `
//         </tbody>
//         </table>`;
//     return htmlString;
//   }
// }

// function createCarTypes(typesArray) {
//   let htmlString = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <title>Document</title>
//     </head>
//     <body>
//         <h1>Car models</h1>
//         <ul>
//             <li> ${typesArray.join("</li> <li>")} </li>
//         </ul>

//     </body>
//     </html>`;
//   return htmlString;
// }
