const express = require("express");

const db = require('../data/dbConfig.js');

const router = express.Router();

//endpoints --> CRUD operations

router.get("/", (req, res) => {
    
    db("cars")
    .then(cars => {
        res
        .status(200)
        .json(cars)
    })
    .catch(error => {
        res
        .status(500)
        .json({ message: "Failed to retrieve cars.", error })
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params
    
    db("cars")
    .where({ id })
    .first()
    .then(car => {
        res
        .status(200)
        .json(car)
    })
    .catch(error => {
        res
        .status(500)
        .json({ message: "Failed to retrieve car with specified ID.", error })
    })
});

router.post("/", (req, res) => {
    const carsData = req.body
    
    db("cars")
    .insert(carsData)
    .then(ids => {
        db("cars")
        .where({ id: ids[0] })
        .then(newCar => {
            res
            .status(201)
            .json(newCar);
        });
    })
    .catch(error => {
        console.log(error)
        res
        .status(500)
        .json({ errorMessage: "The database was unable to add the car.", error })
    });
})

router.put("/:id", (req, res) => {
    const changes = req.body
    const { id } = req.params

    db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
        if (count > 0){
            res
            .status(200)
            .json({ message: `${count} record(s) updated`})
        } else {
            res
            .status(404)
            .json({ message: "Car with specified ID not found."})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ message: "Error updating the car information.", error})
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params

    db("cars")
    .where({ id })
    .del()
    .then(count => {
        if (count > 0){
            res
            .status(200)
            .json({ message: `${count} record(s) removed`})
        } else {
            res
            .status(404)
            .json({ message: "Car with specified ID not found."})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ message: "Error removing the car.", error})
    })
})

module.exports = router;