const Discord = require("discord.js"),
	mongoose = require("mongoose");
const config = require("../botconfig.json"),
	errors = require("../utils/errors.js"),
	Money = require("../models/money.js");

mongoose.connect("mongodb://localhost:27017/DoggoChan", {
	useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {
	await message.delete();

	let target = message.mentions.members.first();
	if (!target) return errors.noTar(message);
	let author = message.author.id;
	let amt = parseInt(args[1]);
	if (!amt || isNaN(amt) || amt < 1) return errors.noAmt(message);

	Money.findOne({
		userID: message.author.id,
		serverID: message.guild.id
	}, (err, res) => {
		if (err) console.log(err);
		if (!res || res.money < amt) return errors.notEgh(message);

		targetres.money = target.money + amt;
		res.money = res.money - amt;

		
	})
}

module.exports.help = {
	name: "pay",
	role: "hidden",
	description: "**NONWORKING**"
}
