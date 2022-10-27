"use strict";

const http = require("http");

const { port, host } = require("./config.json");

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    `http://${req.headers.host}${req.url}`
  );

  let message = "unrecognesed";

  if (pathname === "/greetings") {
    message = "Greetings";
  } else if (pathname === "/hi") {
    message = "Hi!";
  } 
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>${message}</h1>`);
});

server.listen(port, host, () =>
  console.log(`server ${port}, ${host} is running...`)
);
