const Discord = require("discord.js");
const config = require("../botconfig.json"),
	errors = require("../utils/errors.js"),
	res = require("../assets/8ball.json");

module.exports.run = async (bot, message, args) => {
	if (!args[2]) return errors.emptyQuestion(message);
	let replies = res.res;

	let result = Math.floor((Math.random() * replies.length));
	let question = args.slice(0).join(" ");

	let ballEmbed = new Discord.RichEmbed()
	.setAuthor(message.author.tag)
	.setColor(config.doggo)
	.addField("Question", question)
	.addField("Answer", replies[result]);

	message.channel.send(ballEmbed);
}

module.exports.help = {
	name: "8ball",
	role: "fun",
	description: "Ask me any question"
}
