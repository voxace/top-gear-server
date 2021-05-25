const db = require("../models");
const LapTime = db.laptime;

// Save or update a laptime
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  console.log(req.body);

  // Create a filter
  const filter = {
    name: req.body.name,
    leaderboard: req.body.leaderboard
  };

  // Create a laptime
  const laptime = {
    name: req.body.name,
    minutes: req.body.minutes,
    seconds: req.body.seconds,
    ms: req.body.ms,
    leaderboard: req.body.leaderboard
  };

  LapTime
    .findOneAndUpdate(filter, laptime, {
      new: true,
      upsert: true
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating or updating the laptime."
      });
    });

};

// Retrieve all laptimes from the database.
exports.findAll = (req, res) => {
  LapTime
    .find()
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

  LapTime
    .findById(id)
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

  LapTime
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  LapTime
    .findByIdAndRemove(id)
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

// Find all laptimes by leaderboard
exports.findByLeaderboard = (req, res) => {
  LapTime
    .find({ leaderboard: req.query.leaderboard })
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

// Delete a laptime with the specified id in the request
exports.deleteByLeaderboard = (req, res) => {
  const id = req.params.id;

  LapTime
    .deleteMany({ leaderboard: id })
    .then(data => {
      res.send({
        message: "Laptimes were deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete laptimes with leaderboard id=" + id
      });
    });
};