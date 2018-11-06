const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	message.delete();
	if (!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
	if (args[0] == "help") {
		message.reply("Usage: !ban <user> <reason>");
		return;
	}
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!bUser) return errors.cantfindUser(message.channel);
	if (bUser.id === bot.user.id) return errors.botuser(message);
	let bReason = args.join(" ").slice(22);
	if (!bReason) return errors.noReason(message.channel);
	if (bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

	let banEmbed = new Discord.RichEmbed()
		.setDescription("~Ban~")
		.setColor(botconfig.red)
		.addField("Banned User", `${bUser} with ID ${bUser.id}`)
		.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
		.addField("Banned In", message.channel)
		.addField("Time", message.createdAt)
		.addField("Reason", bReason);

	let incidentchannel = message.guild.channels.find(`name`, "logs");
	if (!incidentchannel) return message.channel.send("Can't find logs channel.");

	message.guild.member(bUser).ban(bReason);
	incidentchannel.send(banEmbed);
}

module.exports.help = {
	name: "ban",
	role: "admin",
	description: "Bans a user"
}
