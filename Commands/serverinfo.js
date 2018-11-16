const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	let serverembed = new Discord.RichEmbed()
		.setAuthor(message.guild.name, message.guild.iconURL)
		.setDescription("Server Information")
		.setColor(botconfig.doggo)
		.setThumbnail(message.guild.iconURL)
		.addField("Server Name", message.guild.name, true)
		.addField("Server ID", message.guild.id, true)
		.addField("Server Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
		.addField("Channels", message.guild.channels.size, true)
        .addField("Roles", message.guild.roles.size, true)
		.addField("Created On", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
		.addField("You Joined", message.member.joinedAt, true)
		.addField("Total Members", message.guild.memberCount, true);

	message.channel.send(serverembed);
}

module.exports.help = {
	name: "serverinfo",
	role: "utility",
	description: "Gives info on the server"
}
