const router = require('express').Router();
const data = require('./../../controllers/controller');

// Retrieve all data
router.get("/", data.findAll);

// Create a new data
router.post('/', data.create);

// Update a data with id
router.put("/:filmId", data.update);

// Delete a data with id
router.delete("/:filmId", data.delete);

module.exports = router;