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

// Getting All Cats
app.get("/all", (req, res) =>
  dataStorage.getAll().then((data) => res.render("allCats", { result: data }))
);

// Getting one cat by number
app.get("/getCat", (req, res) =>
  res.render("getCat", {
    title: "Get",
    header1: "Get a cat",
    action: "/getCat",
  })
);

app.post("/getCat", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const catNumber = req.body.number;
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

// Updating the form with cat info
app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Update cat",
    header1: "Update cat information",
    action: "/updatedata1",
    number: { value: "", readonly: "" },
    name: { value: "", readonly: "readonly" },
    weightKg: { value: "", readonly: "readonly" },
    yearOfBirth: { value: "", readonly: "readonly" },
    breed: { value: "", readonly: "readonly" },
  })
);

app.post("/updatedata1", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  dataStorage
    .getOne(req.body.number)
    .then((cat) =>
      res.render("form", {
        title: "Update cat",
        header1: "Update cat information",
        action: "/update1",
        number: { value: cat.number, readonly: "readonly" },
        name: { value: cat.name, readonly: "" },
        weightKg: { value: cat.weightKg, readonly: "" },
        yearOfBirth: { value: cat.yearOfBirth, readonly: "" },
        breed: { value: cat.breed, readonly: "" },
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/update1", (req, res) => {
  if (!req.body) return res.statusCode(500);
  dataStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

// removing Cat info 
app.get("/removeCat", (req, res) =>
  res.render("getCat", {
    title: "Remove",
    header1: "Remove cat",
    action: "/removeCat",
  })
);

app.post("/removeCat", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const catNumber = req.body.number; 
  dataStorage
    .remove(catNumber)
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
