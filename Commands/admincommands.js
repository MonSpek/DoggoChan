const Discord = require("discord.js"),
	fs = require("fs");

const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	await message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");

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
		.setDescription("Admin Command list")
		.setFooter("All commands have to have a prefix in front of them, the defult is \".\" ");

		let result = jsfile.forEach((f, i) => {
			let props = require(`./${f}`);
			namelist = props.help.name;
			desclist = props.help.description;
			rolelist = props.help.role
			
			// send help text
			if(rolelist === "admin"){
				commandEmbed.addField(`**${namelist}**`, `${desclist}`);
			}
		});

		message.channel.send(commandEmbed).then(msg => msg.delete(120000));
	});
}

module.exports.help = {
	name: "admincommands",
	role: "admin",
	description: "Lists admin commands."
}