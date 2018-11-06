const Discord = require("discord.js"),
	mongoose = require('mongoose');
const botconfig = require("../botconfig.json"),
	errors = require("../utils/errors.js"),
	Reports = require("../models/reports.js");

module.exports.run = async (bot, message, args) => {
	await message.delete();

	mongoose.connect('mongodb://localhost:27017/DoggoChan', {
		useNewUrlParser: true
	});

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!rUser) return errors.cantfindUser(message.channel);
	let rreason = args.join(" ").slice(22);

	let reportEmbed = new Discord.RichEmbed()
		.setDescription("Reports")
		.setColor(botconfig.red)
		.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
		.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
		.addField("Channel", message.channel)
		.addField("Time", message.createdAt)
		.addField("Reason", rreason);

	let replyEmbed = new Discord.RichEmbed()
		.setDescription(`${rUser} has been reported by ${message.author}`)
		.setColor(botconfig.red);
	
	let reportschannel = message.guild.channels.find(ch => ch.name === 'reports');
	if (!reportschannel) return message.channel.send("Couldn't find reports channel.");

	const report = new Reports({
		_id: mongoose.Types.ObjectId(),
		username: rUser.user.username,
		userID: rUser.id,
		reason: rreason,
		rUsername: message.author.username,
		rID: message.author.id,
		time: message.createdAt
	});

	report.save()
	.then(result => console.log(result))
	.catch(err => console.log(err));

	reportschannel.send(reportEmbed);
	message.channel.send(replyEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
	name: "report",
	role: "utility",
	description: "Reports a user to the mods (**MUST SUPPLY A REASON**)"
}
