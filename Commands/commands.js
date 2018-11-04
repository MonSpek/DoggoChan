const Discord = require("discord.js"),
	fs = require("fs");

const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	await message.delete();

	fs.readdir("./commands/", (err, files) => {
		if (err) console.log(err);
		let jsfile = files.filter(f => f.split(".").pop() === "js");
		if (jsfile.length <= 0) {
			return console.log("Couldn't find commands.");
		}
		
		var namelist = "";
		var desclist = "";
		var rolelist = "";

		let commandEmbed = new Discord.RichEmbed()
		.setColor(config.doggo)
		.setAuthor(message.author.tag)
		.setThumbnail(bot.user.displayAvatarURL)
		.setDescription("Command list");

		let result = jsfile.forEach((f, i) => {
			let props = require(`./${f}`);
			namelist = props.help.name;
			desclist = props.help.description;
			rolelist = props.help.role
			
			// send help text
			if(rolelist === "normal"){
				commandEmbed.addField(`**${namelist}**`, `${desclist}`);
			}
		});

		message.channel.send(commandEmbed);
	});
}

module.exports.help = {
	name: "commands",
	role: "normal",
	description: "Lists commands."
}
