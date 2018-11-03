const Discord = require("discord.js"),
	fs = require("fs"),
	mongoose = require("mongoose");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
const botconfig = require("./botconfig.json"),
	activities = require("./assets/activity.json"),
	bList = require("./assets/blacklist.json"),
	errors = require("./utils/errors.js"),
	Money = require("./models/money.js");
let coins = require("./coins.json");
let xp = require("./xp.json");

mongoose.connect('mongodb://localhost:27017/DoggoChan', {
	useNewUrlParser: true
});

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

bot.on("ready", () => {
	console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
	bot.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		bot.user.setActivity(activity.text, { type: activity.type });
	}, 60000);
});

bot.on("message", async message => {
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}

	//for my server only
	if (message.guild.id === "498112893330391041") {
		let wordfound = false;
		for (var i in bList.words) {
			if (message.content.toLowerCase().includes(bList.words[i].toLowerCase())) wordfound = true;
		}

		if (wordfound) {
			message.delete();
			errors.bannedWord(message);
		}
	}

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let prefix = prefixes[message.guild.id].prefixes;
	if(message.content.startsWith(prefix) && !message.author.bot && message.channel.type !== "dm") {
		let commandfile = bot.commands.get(cmd.slice(prefix.length));
		if (commandfile) commandfile.run(bot, message, args);
	} else if(!message.author.bot && message.channel.type !== "dm") {
		let coinstoadd = Math.floor(Math.random() * 50) + 1;
		let coinsneeded = Math.floor(Math.random() * 50) + 1;
		if (coinstoadd == coinsneeded){
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

					message.channel.send(moneyEmbed).then(msg => {msg.delete(5000)});
				} else {
					money.money = money.money + coinstoadd;

					money.save().catch(err => console.log(err));

					message.channel.send(moneyEmbed).then(msg => {msg.delete(5000)});
				}
			})
		}
		
		let xpAdd = Math.floor(Math.random() * 7) + 8;

		if (!xp[message.author.id]) {
			xp[message.author.id] = {
				xp: 0,
				level: 1
			};
		}

		let curxp = xp[message.author.id].xp;
		let curlvl = xp[message.author.id].level;
		let nxtLvl = xp[message.author.id].level * 300;
		xp[message.author.id].xp = curxp + xpAdd;
		if (nxtLvl <= xp[message.author.id].xp) {
			xp[message.author.id].level = curlvl + 1;
			let lvlup = new Discord.RichEmbed()
				.setTitle("Level Up!")
				.setColor(botconfig.doggo)
				.addField("New Level", curlvl + 1);

			message.channel.send(lvlup).then(msg => { msg.delete(5000) });
		}
		fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
			if (err) console.log(err)
		});
	}

});

bot.login(botconfig.token);
