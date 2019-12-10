const express = require('express');

const carsRouter = require('./api/carsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.send('<h3>Sanity Test!</h3>')
});

module.exports = server

