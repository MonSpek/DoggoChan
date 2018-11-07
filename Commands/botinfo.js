const Discord = require("discord.js");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
	let bicon = bot.user.displayAvatarURL;
	let botembed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setColor(botconfig.doggo)
		.setThumbnail(bicon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt)
		.addField("Created by", "Butch la Bully")
		.addField("Servers", `${bot.guilds.size}`)
		.addField("Github Repo", "https://github.com/MonSpek/DoggoChan");

	message.channel.send(botembed);
}

module.exports.help = {
	name: "botinfo",
	role: "about",
	description: "Gives info about me!"
}
