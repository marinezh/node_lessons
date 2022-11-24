'use strict';
// node path module
const path = require('path')

const express = require('express');
const app = express();

// using environment variable
const port = process.env.PORT || 3000;
const host = process.env.PORT || 'localhost';

// creating the path that we need using Node path module
const homePath = path.join(__dirname, 'home.html')
const pageBPath = path.join(__dirname, 'pageB.html')
const pageCPath = path.join(__dirname, 'pageC.html')
// const pageDPath = path.join(__dirname, 'pageD.html')

app.use(express.static(path.join(__dirname, 'public')))

// sends the files back to the browser
app.get('/', (req, res) => res.sendFile(homePath));
app.get('/pageB', (req, res) => res.sendFile(pageBPath));
app.get('/pageC', (req, res) => res.sendFile(pageCPath));
// app.get('/pages/pageD', (req, res) => res.sendFile(pageDPath));

app.listen(port, host, () => console.log(`Server ${host}:${port} is running`))

// why we do not cteate path to the D page which is in pages folder? why we connect this page only in home.html (/pages/pageD.html)