const Discord = require("discord.js"),
	mongoose = require("mongoose");
const botconfig = require("../botconfig"),
	xpMongoose = require("../models/xp.js");
//let xp = require("../xp.json");

mongoose.connect('mongodb://localhost:27017/DoggoChan', {
	useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {
	await message.delete();

	xpMongoose.findOne({
		userID: message.author.id,
		serverID: message.guild.id
	}, (err, xp) => {
		if(err) console.log(err);

		if (!xp) {
			const newXP = new xpMongoose({
				userID: message.author.id,
				serverID: message.guild.id,
				xp: 0,
				level: 1
			})

			newXP.save().catch(err => console.log(err));
		} else {
			let curxp = xp.xp;
			let curlvl = xp.level;
			let nxtLvlxp = curlvl * 300;
			let difference = nxtLvlxp - curxp;

			let lvlEmbed = new Discord.RichEmbed()
				.setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
				.setColor(botconfig.doggo)
				.addField("Level", curlvl, true)
				.addField("XP", curxp, true)
				.setFooter(`${difference} XP til level up`);

			message.channel.send(lvlEmbed).then(msg => { msg.delete(10000) });
		}
	})
}

module.exports.help = {
	name: "level",
	role: "utility",
	description: "checks your level"
}
