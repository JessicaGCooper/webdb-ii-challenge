const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

//endpoints --> CRUD operations

router.get('/', (req, res) => {

});

router.get('/:id', validateID, (req, res) => {
    
});

router.post('/', (req, res) => {

})

router.put('/:id', validateID, (req, res) => {

})

router.delete('/:id', validateID, (req, res) => {

})

module.exports = router;

//middleware

function validateID(req, res, next){
    const id = req.params.id

    knex('cars')
        .select('*')
        .where({ id })
        .first()
        .then(car => {
            if (car){
                next()
            } else {
                res
                .status(400)
                .json({ message: 'Invalid Car ID'})
            }
        })
        .catch(error => {    
            res
            .status(500)
            .json({ errorMessage: 'Server error validating Car ID' });
        })
}