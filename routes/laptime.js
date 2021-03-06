const express = require("express")
const router = express.Router()
const laptime = require("../controller/laptime.controller");

// /api/laptime: GET, POST, DELETE
// /api/laptime/:id: GET, PUT, DELETE

// Create a new laptime
router.post("/", laptime.create);

// Retrieve all laptimes
router.get("/", laptime.findAll);

// Retrieve all laptimes for driver
router.get("/driver", laptime.findDriver);

// Retrieve all published laptimes
router.get("/leaderboard", laptime.findByLeaderboard);

// Retrieve a single laptime with id
router.get("/:id", laptime.findOne);

// Update a laptime with id
router.put("/:id", laptime.update);

// Delete a laptime with id
router.delete("/:id", laptime.delete);

// Delete a laptime by leaderboard id
router.delete("/leaderboard/:id", laptime.deleteByLeaderboard);

module.exports = router