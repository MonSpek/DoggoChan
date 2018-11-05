const Discord = require("discord.js");
const config = require("../botconfig.json"),
	errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
	if (!args[2]) return errors.emptyQuestion(message);
	let replies = ["Yes.", "No", "I am not sure", "Bork! STFU", "Your mom has AIDS", "MC Ride fucked you last night", "Ask again later papi", "Bork!", "Woof!", "Ban all furries", "Ban all bronies", "@everyone lol", "Okay this is epic!", "Sam Hyde is super cute UwU", "I have AIDS", "My mom beats me", "FREE LIL PUMP!!", "I am gay", "I want to fuck MC RIDE!!"];

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
	role: "normal",
	description: "Ask me any question"
}
