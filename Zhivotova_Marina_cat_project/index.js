"use strict";

const path = require("path");

const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages")); // connect folder pages with ejs files

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // connect folder public with scc file

// home page
const menuPath = path.join(__dirname, "menu.html"); // connect home page

app.get("/", (req, res) => res.sendFile(menuPath));

// Getting All Employees
app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allCats", { result: data }))
);

// Getting one cat by number
app.get("/getCat", (req, res) =>
  res.render("getCat", {
    title: "Get",
    header1: "Get",
    action: "/getCat",
  })
);

app.post("/getCat", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const catNumber = req.body.number; // becaose in getPerson we have name=id
  dataStorage
    .getOne(catNumber)
    .then((cat) => res.render("catPage", { result: cat }))
    .catch((error) => sendErrorPage(res, error));
});

// Adding the new cat to the Database
app.get("/inputform", (req, res) => {
    res.render("form", {
      title: "Add cat",
      header1: "Add a new cat",
      action: "/input",
      number: { value: "", readonly: "" },
      name: { value: "", readonly: "" },
      weightKg: { value: "", readonly: "" },
      yearOfBirth: { value: "", readonly: "" },
      breed: { value: "", readonly: "" },
    });
  });
  
  app.post("/input", (req, res) => {
    if (!req.body) return res.statusCode(500);
  
    dataStorage
      .insert(req.body)
      .then((status) => sendStatusPage(res, status))
      .catch((error) => sendErrorPage(res, error));
  });

  app.listen(port, host, () =>
  console.log(`Server ${host}:${port} listening...`)
);


// helpers functions

function sendErrorPage(res, error, title = "Error", header1 = "Error") {
  sendStatusPage(res, error, title, header1);
}

function sendStatusPage(res, status, title = "Status", header1 = "Status") {
  return res.render("statusPage", { title, header1, status });
}
