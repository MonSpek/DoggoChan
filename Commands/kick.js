const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!kUser) return errors.cantfindUser(message.channel);
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.cantfindUser(message.channel);
	if (kUser.id === bot.user.id) return errors.botuser(message);
	let kReason = args.join(" ").slice(22);
	if (kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

	let kickEmbed = new Discord.RichEmbed()
		.setDescription("~Kick~")
		.setColor(botconfig.red)
		.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
		.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
		.addField("Kicked In", message.channel)
		.addField("Time", message.createdAt)
		.addField("Reason", kReason);

	let kickChannel = message.guild.channels.find(`name`, "logs");
	if (!kickChannel) return message.channel.send("Can't find logs channel.");

	message.guild.member(kUser).kick(kReason);
	kickChannel.send(kickEmbed);
}

module.exports.help = {
	name: "kick"
}
