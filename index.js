const Discord = require("discord.js"),
	fs = require("fs"),
	mongoose = require("mongoose"),
	Canvas = require("canvas"),
	snekfetch = require("snekfetch");
const bot = new Discord.Client({ disableEveryone: false });
bot.commands = new Discord.Collection();
const botconfig = require("./botconfig.json"),
	activities = require("./assets/activity.json"),
	bList = require("./assets/blacklist.json"),
	errors = require("./utils/errors.js"),
	xpMongoose = require("./models/xp.js"),
	Money = require("./models/money.js"),
	Reports = require("./models/reports.js"),
	banMongoose = require("./models/banned.js");

mongoose.connect('mongodb://localhost:27017/DoggoChan', {
	useNewUrlParser: true
});

const recentCommands = new Set();

//TODO: 1) figure out more things to do with mongoose
//TODO: 2) add the word filter to editted messages
//TODO: 3) make things, such as word filter, optional in the mongod database

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("./commands/music/", (err, files) => {
	if (err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Couldn't music find commands.");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/music/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

//! changes the canvas font to a level where it doesn't consume the entrire message
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	//* Font size
	let fontSize = 70;

	do {
		//* Sets the font
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

//! For the member count
const applyText2 = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	//* Font size
	let fontSize = 80;

	do {
		//* Sets the font
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

bot.on("ready", () => {
	//* gives info on bot status
	let pluralnonpluralservers = (bot.guilds.size > 1) ? 'Servers' : 'Server';
	let pluralnonpluralusers = (bot.users.size > 1) ? 'Users' : 'User';

	console.log(`\n\n${bot.user.username} is online.\nOperating on ${bot.guilds.size} ${pluralnonpluralservers}.\nOperating for ${bot.users.size} ${pluralnonpluralusers}.\n\n`);
	//* randomly sets activity
	bot.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		bot.user.setActivity(activity.text, { type: activity.type });
	}, 60000);
});

bot.on('guildCreate', (guild) => {
	console.log(`\n\n[Console] Joined the Guild ${guild.name}.\nGuild Owner: ${guild.owner.user.tag}\nNumber of Members: ${guild.memberCount}\nGuild Location: ${guild.region}\n\n`);

	guild.createChannel("logs", "text");
	guild.createChannel("reports", "text");
	guild.createChannel("member-log", "text");
});

bot.on('guildDelete', (guild) => {
	console.log(`\n\n[Console] Left the Guild ${guild.name}.\nGuild Owner: ${guild.owner.user.tag}\nNumber of Members: ${guild.memberCount}\nGuild Location: ${guild.region}\n\n`);

	Money.findByIdAndDelete({
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
	});

	xpMongoose.findByIdAndDelete({
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
	});

	banMongoose.findByIdAndDelete({
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
	});

	Reports.findByIdAndDelete({
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
	});
})

bot.on('guildBanAdd', (guild, user) => {
	var d = Date.now();

	//!Removes banned user from database
	Money.findOneAndDelete({
		userID: user.id,
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
		console.log(`${user.id} has been banned from ${guild} and thus has been removed from the database`);
	});

	xpMongoose.findOneAndDelete({
		userID: user.id,
		serverID: guild.id
	}, (err, res) => {
		if (err) console.log(err);
		console.log(`${user.id} has been banned from ${guild} and thus has been removed from the database`);
	});

	banMongoose.findOne({
		serverID: guild.id
	}, (err, ban) => {
		if (err) console.log(err);

		if (!ban) {
			const newBan = new banMongoose({
				userID: user.id,
				userName: user.username,
				serverID: guild.id,
				date: d.toString(),
				reason: "none"
			})

			newBan.save().catch(err => console.log(err));
		} else {
			return;
		}
	})
});

bot.on('guildMemberAdd', async member => {
	Money.findOne({
		userID: member.id,
		serverID: member.guild.id
	}, (err, money) => {
		if (err) console.log(err);

		if (!money) {
			const newMoney = new Money({
				userID: member.id,
				serverID: member.guild.id,
				money: 0
			})

			newMoney.save().catch(err => console.log(err));
		}
	})

	xpMongoose.findOne({
		userID: member.id,
		serverID: member.guild.id
	}, (err, xp) => {
		if (err) console.log(err);

		if (!xp) {
			const newXP = new xpMongoose({
				userID: member.id,
				serverID: member.guild.id,
				xp: 0,
				level: 1
			})

			newXP.save().catch(err => console.log(err));
		}
	})

	//* Finds channel
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	if (!channel) return;

	//* Makes canvas
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	//* Adds background
	const background = await Canvas.loadImage("./assets/snow.jpg");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	//* Adds border
	ctx.strokeStyle = '#143ebc';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	//* Adds text to the top
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);


	//* Adds text
	ctx.font = applyText(canvas, `${member.displayName}!`); //* assigns font
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.font = applyText2(canvas, `You are the ${member.guild.memberCount}th member!`); //* assigns font
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`You are the ${member.guild.memberCount}th member!`, canvas.width / 2.5, canvas.height / 1.3);

	//* Makes avatar circuliar
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	ctx.strokeStyle = '#000000';
	ctx.stroke();

	//* Adds avatar
	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	//* Adds image
	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')

	//* Sends image
	channel.send(`Welcome to the server, ${member}!`, attachment);
});

bot.on('guildMemberRemove', async member => {
	//! Removes left use from database
	Money.findOneAndDelete({
		userID: member.id,
		serverID: member.guild.id
	}, (err, res) => {
		if (err) console.log(err)
		console.log(`${member.id} left ${member.guild} and thus has been removed from the database`)
	});

	xpMongoose.findOneAndDelete({
		userID: member.id,
		serverID: member.guild.id
	}, (err, res) => {
		if (err) console.log(err)
		console.log(`${member.id} left ${member.guild} and thus has been removed from the database`)
	});

	//* Finds channel
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	if (!channel) return;

	//* Makes canvas
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	//* Adds background
	const background = await Canvas.loadImage("./assets/snow.jpg");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	//* Adds border
	ctx.strokeStyle = '#143ebc';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	//* Adds text to the top
	ctx.font = '26px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('This user has left the server,', canvas.width / 2.5, canvas.height / 3.5);


	//* Adds text
	ctx.font = applyText(canvas, `${member.displayName}.`); //* assigns font
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}.`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.font = applyText2(canvas, `There are ${member.guild.memberCount} left.`); //* assigns font
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`There are ${member.guild.memberCount} left.`, canvas.width / 2.5, canvas.height / 1.3);

	//* Makes avatar circuliar
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	ctx.strokeStyle = '#000000';
	ctx.stroke();

	//* Adds avatar
	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	//* Adds image
	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')

	//* Sends image
	channel.send(`${member} has left the server!`, attachment);
});

bot.on("messageUpdate", async message => {
	//!for my server only
	if (message.guild.id === "498112893330391041") {
		if (!message.author.bot) {
			let logChl = message.guild.channels.find(ch => ch.name === 'logs');
			if (!logChl) return console.log("log error");

			var d = new Date();
			let logEmbed = new Discord.RichEmbed()
				.setDescription("A User Has Edditted A Post")
				.setColor(botconfig.doggo)
				.addField(`${message.author} Eddited A Post:`, `${message.content} ()`)
				.addField("**Date**:", `${d.toString()}`);

			logChl.send(logEmbed);
		}
	}
});

bot.on("message", async message => {
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	if (message.channel.type === "dm") {
		let embed = new Discord.RichEmbed()
			.setTimestamp()
			.setTitle("Direct Message To The Bot")
			.addField(`Sent By:`, `<@${message.author.id}>`)
			.setColor("RANDOM")
			.setThumbnail(message.author.displayAvatarURL)
			.addField(`Message: `, message.content)
			.setFooter(`DM Bot Messages | DM Logs`)

		bot.users.get("264187153318281216").send(embed)
	}
	if (message.channel.type !== "dm") {
		if (!prefixes[message.guild.id]) {
			prefixes[message.guild.id] = {
				prefixes: botconfig.prefix
			};
		}
	} else {
		console.log("DM recived")
	}

	//!for my server only
	if (message.guild.id === "498112893330391041") {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
			let wordfound = false;
			for (var i in bList.words) {
				if (message.content.toLowerCase().includes(bList.words[i].toLowerCase())) wordfound = true;
				if (wordfound) break;
			}

			if (wordfound) {
				message.delete();
				return errors.bannedWord(message);
			}
		}
	}

	let prefix = prefixes[message.guild.id].prefixes;

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	//* I have been self hosting so to keep the load down on my PC a 5 second cooldown is in place for commands
	if (message.content.startsWith(prefix) && !message.author.bot && message.channel.type !== "dm") {
		if (recentCommands.has(message.author.id)) {
			return
		} else {
			recentCommands.add(message.author.id)

			setTimeout(() => {
				recentCommands.delete(message.author.id);
			}, 5000);
		}

		let commandfile = bot.commands.get(cmd.slice(prefix.length));
		if (commandfile) commandfile.run(bot, message, args);
	} else if (!message.author.bot && message.channel.type !== "dm") {
		let coinstoadd = Math.floor(Math.random() * 50) + 1;
		let coinsneeded = Math.floor(Math.random() * 50) + 1;
		if (coinstoadd == coinsneeded) {
			let moneyEmbed = new Discord.RichEmbed()
				.setAuthor(message.author.username)
				.setColor(botconfig.doggo)
				.addField("💸", `${coinstoadd} coins given to ${message.author}! 🔥`);

			Money.findOne({
				userID: message.author.id,
				serverID: message.guild.id
			}, (err, money) => {
				if (err) console.log(err);

				if (!money) {
					const newMoney = new Money({
						userID: message.author.id,
						serverID: message.guild.id,
						money: coinstoadd
					})

					newMoney.save().catch(err => console.log(err));

					message.channel.send(moneyEmbed).then(msg => { msg.delete(5000) });
				} else {
					money.money = money.money + coinstoadd;

					money.save().catch(err => console.log(err));

					message.channel.send(moneyEmbed).then(msg => { msg.delete(5000) });
				}
			})
		} else {
			Money.findOne({
				userID: message.author.id,
				serverID: message.guild.id
			}, (err, money) => {
				if (err) console.log(err);

				if (!money) {
					const newMoney = new Money({
						userID: message.author.id,
						serverID: message.guild.id,
						money: 0
					})

					newMoney.save().catch(err => console.log(err));
				}
			})
		}

		let xpAdd = Math.floor(Math.random() * 7) + 8;

		xpMongoose.findOne({
			userID: message.author.id,
			serverID: message.guild.id
		}, (err, xp) => {
			if (err) console.log(err);

			if (!xp) {
				const newXP = new xpMongoose({
					userID: message.author.id,
					serverID: message.guild.id,
					xp: xpAdd,
					level: 1
				})

				newXP.save().catch(err => console.log(err));
			} else {
				let curlvl = xp.level;
				let nxtLvl = xp.level * 300;

				xp.xp = xp.xp + xpAdd;

				if (nxtLvl <= xp.xp) {
					xp.level = curlvl + 1;

					let lvlup = new Discord.RichEmbed()
						.setTitle("Level Up!")
						.setColor(botconfig.doggo)
						.addField("New Level", curlvl + 1);

					message.channel.send(lvlup).then(msg => { msg.delete(5000) });
				}

				xp.save().catch(err => console.log(err));
			}
		})
	}

});

bot.login(botconfig.token);
