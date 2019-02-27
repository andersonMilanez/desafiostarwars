const express       = require('express');
const consign       = require('consign');
const bodyParser    = require('body-parser');
const app           = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


consign({cwd:'src'})
    .include('util')
    .then('db')
    .then('model')
    .then('integracao')
    .then('dao')
    .then('controller')
    .then('ws')
    .then('routes')
    .into(app)


module.exports = app;