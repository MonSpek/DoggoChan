const Discord = require("discord.js");
const superagent = require("superagent");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	let { body } = await superagent
		.get(`https://random.dog/woof.json`);

	let dogEmbed = new Discord.RichEmbed()
	.setColor(botconfig.doggo)
	.setTitle("WOOF!")
	.setImage(body.url);

	message.channel.send(dogEmbed);
}

module.exports.help = {
	name: "woof",
	role: "normal",
	description: "Posts a dog picture"
}
