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

})

router.delete("/:id", (req, res) => {

})

module.exports = router;

//middleware

// function validateID(req, res, next){
//     const id = req.params.id

//     db("cars")
//         .select("*")
//         .where({ id })
//         .first()
//         .then(car => {
//             if (car){
//                 next()
//             } else {
//                 res
//                 .status(400)
//                 .json({ message: "Invalid Car ID"})
//             }
//         })
//         .catch(error => {    
//             res
//             .status(500)
//             .json({ errorMessage: "Server error validating Car ID" });
//         })
// }