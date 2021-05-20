const db = require("../models");
const LapTime = db.laptime;

// Create and Save a new laptime
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a laptime
  const laptime = new LapTime({
    name: req.body.name,
    minutes: req.body.minutes,
    seconds: req.body.seconds,
    ms: req.body.ms,
    leaderboard: req.body.leaderboard
  });

  // Save laptime in the database
  laptime
    .save(laptime)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the laptime."
      });
    });

};

// Retrieve all laptimes from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { $regex: new RegExp(content), $options: "i" } } : {};

    LapTime.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving laptimes."
        });
      });

};

// Find a single laptime with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    LapTime.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found laptime with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving laptime with id=" + id });
      });

};

// Update a laptime by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      LapTime.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update LapTime with id=${id}. Maybe LapTime was not found!`
            });
          } else res.send({ message: "LapTime was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating LapTime with id=" + id
          });
        });

};

// Delete a laptime with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    LapTime.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete LapTime with id=${id}. Maybe LapTime was not found!`
          });
        } else {
          res.send({
            message: "LapTime was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });

};

// Delete all laptimes from the database.
exports.deleteAll = (req, res) => {
    LapTime.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} LapTimes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all laptimes."
      });
    });
};

// Find all laptimes by leaderboard
exports.findByLeaderboard = (req, res) => {
    LapTime.find({ leaderboard: req.query.leaderboard })
    .populate('leaderboard')    
    .sort({minutes: 1, seconds: 1, ms: 1})
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving laptimes."
      });
    });
};