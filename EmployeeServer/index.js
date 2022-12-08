'use strict';

const path = require('path');

const express = require('express');
const app = express();

const { port, host, storage } = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/all', (req, res) =>
    dataStorage.getAll().then(data => res.render('allPersons', { result: data }))
);

app.get('/getPerson', (req, res) =>
    res.render('getPerson', {
        title: 'Get',
        header1: 'Get',
        action: '/getPerson'
    })
);

app.post('/getPerson', (res, req) => {
    if (!req.body) return res.sendStatus(500);

    const personId = req.body.id; // becaose in getPerson we have name=id
    dataStorage
        .getOne(personId)
        .then(employee => res.render('personPage', { result: employee }))
        .catch(error => sendErrorPage(res, error))
})

app.get('/inputform', (res, req) => {
    console.log('hhh');
    res.render("form", {
        title: 'Add person',
        header1: 'Add a new Person',
        action: '/input',
        id: { value: '', readonly: '' },
        firstname: { value: '', readonly: '' },
        lastname: { value: '', readonly: '' },
        department: { value: '', readonly: '' },
        salary: { value: '', readonly: '' },

    })
})

app.post('/input', (res, req) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error))
});

app.listen(port, host, () => console.log(`Server ${host}:${port} listening...`));

// helper functions

function sendErrorPage(res, error, title = 'Error', header1 = 'Error') {
    sendStatusPage(res, error, title, header1);

};

function sendStatusPage(res, status, title = 'Status', header1 = 'Status') {
    return res.render('statusPage', { title, header1, status })
}