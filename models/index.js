const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.leaderboard = require("./leaderboard.model.js")(mongoose);
db.laptime = require("./laptime.model.js")(mongoose);

module.exports = db;