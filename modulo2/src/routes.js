const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('Hellow world!');
});

module.exports = routes;
