const Discord = require("discord.js"),
	mongoose = require('mongoose');
const botconfig = require("../botconfig.json"),
	Money = require("../models/money.js");

mongoose.connect("mongodb://localhost:27017/DoggoChan", {
	useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {
	Money.findOne({
		userID: message.author.id,
		serverID: message.guild.id
	}, (err, money) => {
		if(err) console.log(err);

		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setColor(botconfig.doggo)
			.setThumbnail(message.author.displayAvatarURL)

		if(!money) {
			embed.addField("Coins", "0", true);
			return message.channel.send(embed).then(msg => { msg.delete(5000) });
		} else if (money) {
			embed.addField("Coins", money.money, true);
			return message.channel.send(embed).then(msg => { msg.delete(5000) });
		} else {
			message.channel.send("Error")
		}
	})

	message.delete().catch(O_o => { });
}

module.exports.help = {
	name: "coins"
}
