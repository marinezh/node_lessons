"use strict";

const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const { read, send, sendJson, sendError, IsIn } = require(path.join(
  __dirname,
  "library",
  "utilities"
));

const { getAllFlavors, hasFlavor, getIceCream } = require(path.join(
  __dirname,
  "iceCreamStorage",
  "iceCreamFreezer.js"
));

const resourceRoutes = ["/style/", "/js/", "/images/"];

const homePath = path.join(__dirname, "home.html");

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
  const route = decodeURIComponent(pathname);

  try {
    if (route === "/") {
      const result = await read(homePath);
      send(res, result);
      // send(res, await read(homePath));
    } else if (IsIn(route, ...resourceRoutes)) {
      const result = await read(path.join(__dirname, route));
      send(res, result);
    } else if (route === "/all") {
      const flavors = await getAllFlavors();
      sendJson(res, flavors);
      //// sendJson(res, await getAllFlavors());
    } else if (IsIn(route, "/icecreams/")) {
      //route is '/icecreams/vanilla
      const pathParts = route.split("/");
      if (pathParts.length > 2) {
        const iceCreameFlavor = pathParts[2];
        if (await hasFlavor(iceCreameFlavor)) {
          const iceCream = await getIceCream(iceCreameFlavor);
          sendJson(res, iceCream);
        } else {
          sendError(res, "Icecream not found", 400);
        }
      }
    } else {
      sendError(res, "not found");
    }
  } catch (err) {
    sendError(res, err.message,400);
  }
});

server.listen(port, host, () =>
  console.log(`server ${host}:${port} is running`)
);
