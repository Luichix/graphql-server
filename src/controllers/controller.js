const db = require("../models/index");
const Data = db.database;
const Op = db.Sequelize.Op;

// Retrieve all data from the database.
exports.findAll = async (req, res) => {
  const films = await Data.findAll();
  res.json(films); 
};

// Create and Save a new data
exports.create = async (req, res) => {
  const film = await Data.create(req.body);
  res.json(film);
};

// Update a data by the id in the request
exports.update = async (req, res) => {
  await Data.update(req.body, {
    where: { id: req.params.filmId }
  });
  res.json({success: 'Se ha modificado correctamente'})
};

// Delete a data with the specified id in the request
exports.delete = async (req, res) => {
  await Data.destroy({
    where: { id: req.params.filmId }
  });
  res.json({succes: 'Se ha eliminado correctamente'})
};

// Find a single data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Data.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Data with id=" + id
      });
    });
};

// Delete all data from the database.
exports.deleteAll = (req, res) => {
  Data.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published data
exports.findAllPublished = (req, res) => {
  Data.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};