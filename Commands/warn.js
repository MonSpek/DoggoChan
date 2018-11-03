const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const botconfig = require("../botconfig.json");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
	await message.delete();

	if (!message.member.hasPermission("MANAGE_MEMBERS")) return errors.noPerms(message, "MANAGE_MEMBERS");
	let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
	if (!wUser) return errors.cantfindUser(message.channel);
	if (wUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MEMBERS");
	if (wUser.id === bot.user.id) return errors.botuser(message);
	let reason = args.join(" ").slice(22);

	if (!warns[wUser.id]) warns[wUser.id] = {
		warns: 0
	};

	warns[wUser.id].warns++;

	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.log(err);
	});

	let warnEmbed = new Discord.RichEmbed()
		.setDescription("Warns")
		.setAuthor(message.author.username)
		.setColor(botconfig.red)
		.addField("Warned User", `<@${wUser.id}>`)
		.addField("Warned In", message.channel)
		.addField("Number of Warnings", warns[wUser.id].warns)
		.addField("Reason", reason);

	let warnchannel = message.guild.channels.find(`name`, "logs");
	if (!warnchannel) return message.reply("Couldn't find channel");

	warnchannel.send(warnEmbed);

	if (warns[wUser.id].warns == 1) {
		//makes muted role
		let muterole = message.guild.roles.find(`name`, "muted");
		let mutetime = "2h";

		if (!muterole) {
			try {
				muterole = await message.guild.createRole({
					name: "muted",
					color: "#000000",
					permissions: []
				})
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						ADD_REACTIONS: false,
						SPEAK: false,
						CONNECT: false
					});
				});
			} catch (e) {
				console.log(e.stack);
			}
		}
		//end of make mute roles
		await (wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been temporarily muted`);

		setTimeout(function () {
			wUser.removeRole(muterole.id)
			message.reply(`<@${wUser.id}> has been unmuted.`);
		}, ms(mutetime))
	}

	if (warns[wUser.id].warns == 2) {
		let muterole = message.guild.roles.find(`name`, "muted");
		let mutetime = "24h";
		await (wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been temporarily muted`).then(msg => { msg.delete(5000) });

		setTimeout(function () {
			wUser.removeRole(muterole.id)
			message.reply(`<@${wUser.id}> has been unmuted.`);
		}, ms(mutetime))
	}
	if (warns[wUser.id].warns == 3) {
		let muterole = message.guild.roles.find(`name`, "muted");
		let mutetime = "48h";
		await (wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been temporarily muted`).then(msg => { msg.delete(5000) });

		setTimeout(function () {
			wUser.removeRole(muterole.id)
			message.reply(`<@${wUser.id}> has been unmuted.`);
		}, ms(mutetime))
	}
	if (warns[wUser.id].warns == 4) {
		message.guild.member(wUser).ban(reason);
		message.reply(`<@${wUser.id}> has been banned.`).then(msg => { msg.delete(10000) });
	}
}

module.exports.help = {
	name: "warn"
}
