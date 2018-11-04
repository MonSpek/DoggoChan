const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
	let botmessage = args.join(" ");
	message.delete().catch();
	message.channel.send(botmessage);
}

module.exports.help = {
	name: "say",
	role: "admin",
	description: "Makes me say anything"
}
