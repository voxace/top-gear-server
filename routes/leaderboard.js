const express = require("express")
const router = express.Router()
const leaderboard = require("../controller/leaderboard.controller");

// /api/leaderboard: GET, POST, DELETE
// /api/leaderboard/:id: GET, PUT, DELETE

// Create a new leaderboard
router.post("/", leaderboard.create);

// Retrieve all leaderboards
router.get("/", leaderboard.findAll);

// Retrieve a single leaderboard with id
router.get("/:id", leaderboard.findOne);

// Update a leaderboard with id
router.put("/:id", leaderboard.update);

// Delete a leaderboard with id
router.delete("/:id", leaderboard.delete);

module.exports = router