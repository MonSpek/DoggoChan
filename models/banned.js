const mongoose = require("mongoose");

const banSchema = mongoose.Schema({
    userID: String,
    userName: String,
    serverID: String,
    date: String,
    reason: String
})

module.exports = mongoose.model("banned", banSchema);