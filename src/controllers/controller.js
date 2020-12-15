const db = require("../models");
const Data = db.database;
const Op = db.Sequelize.Op;

// Show data 
exports.show = (req,res) => {
    res.send((
        [
            {
                "id": 1,
                "name": "Luichix Show",
                "username": "Router"
            }
        ]
    ));
}

// Create and Save a new data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const data = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    card: req.body.card,
    phone: req.body.phone,
    typeContract: req.body.typeContract,
    startContract: req.body.startContract,
    finishContract: req.body.finishContract,
    area: req.body.area,
    job: req.body.job,
    monthlySalary: req.body.monthlySalary,
    regime: req.body.regime,
    workday: req.body.workday,
    timeControl: req.body.timeControl,
    paymentMethod: req.body.paymentMethod,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  console.log(data);

  Data.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all data from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Data.findAll({ where: condition })
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

// Update a data by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Data.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      });
    });
};

// Delete a data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Data.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
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