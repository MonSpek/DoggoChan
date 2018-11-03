const Discord = require("discord.js"),
    mongoose = require("mongoose");

const money = require("../models/money.js");

mongoose.connect('mongodb://localhost:27017/DoggoChan', {
    useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {

}

module.exports.help = {
    name: "leader",
    alias: "leaderboard"
}