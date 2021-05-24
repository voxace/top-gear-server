const db = require("../models");
const Leaderboard = db.leaderboard;

// Create and Save a new leaderboard
exports.create = (req, res) => {

    // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a leaderboard
  const leaderboard = new Leaderboard({
    track: req.body.track,
    car: req.body.car
  });  

  // Save leaderboard in the database
  leaderboard
    .save()
    .then(data => {
      res.status(200).send(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the leaderboard."
      });
    });

};

// Retrieve all leaderboards from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { $regex: new RegExp(content), $options: "i" } } : {};

    Leaderboard.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving leaderboards."
        });
      });

};

// Find a single leaderboard with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Leaderboard.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found leaderboard with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving leaderboard with id=" + id });
      });

};

// Update a leaderboard by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      Leaderboard.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Leaderboard with id=${id}. Maybe Leaderboard was not found!`
            });
          } else res.send({ message: "Leaderboard was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Leaderboard with id=" + id
          });
        });

};

// Delete a leaderboard with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Leaderboard.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Leaderboard with id=${id}. Maybe Leaderboard was not found!`
          });
        } else {
          res.send({
            message: "Leaderboard was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });

};

// Delete all leaderboards from the database.
exports.deleteAll = (req, res) => {
    Leaderboard.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Leaderboards were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all leaderboards."
      });
    });
};