const Discord = require("discord.js"),
    fs = require("fs");

const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    await message.delete();

    const embed1 = new Discord.RichEmbed()
        .setColor(config.doggo)
        .setTitle('**Commands:**')
        .setThumbnail(message.author.avatarURL)
        .setDescription('👮» Moderation.\n\n😂 » Fun.\n\n⛏ » Utilities.\n\n👌 » About.\n\n')
        .setImage('https://i.imgur.com/vXRfAd6.gif')
    await message.channel.send(embed1).then(async msg => {
        await msg.react('👮')
        await msg.react('😂')
        await msg.react('⛏')
        await msg.react('👌')

        const admfilter = (reaction, user) => reaction.emoji.name === '👮' && user.id === message.author.id;
        const adm = msg.createReactionCollector(admfilter, { time: 10000000 });

        adm.on('collect', client1 => {
            fs.readdir("./commands/", (err, files) => {
                if (err) console.log(err);
                let jsfile = files.filter(f => f.split(".").pop() === "js");
                if (jsfile.length <= 0) {
                    return console.log("Couldn't find commands.");
                }

                const embed2 = new Discord.RichEmbed()
                    .setAuthor('Moderation', message.author.displayAvatarURL)
                    .setColor(config.doggo)
                    .setImage('https://i.imgur.com/vXRfAd6.gif')

                var namelist = "";
                var desclist = "";
                var rolelist = "";

                let result = jsfile.forEach((f, i) => {
                    let props = require(`./${f}`);
                    namelist = props.help.name;
                    desclist = props.help.description;
                    rolelist = props.help.role

                    // send help text
                    if (rolelist === "admin") {
                        embed2.addField(`**${namelist}**`, `${desclist}`);
                    }
                });

                msg.edit(embed2);
            });
        })

        const funfilter = (reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id;
        const fun = msg.createReactionCollector(funfilter, { time: 10000000 });

        fun.on('collect', client2 => {
            fs.readdir("./commands/", (err, files) => {
                if (err) console.log(err);
                let jsfile = files.filter(f => f.split(".").pop() === "js");
                if (jsfile.length <= 0) {
                    return console.log("Couldn't find commands.");
                }

                const embed3 = new Discord.RichEmbed()
                    .setAuthor('Fun Commands', message.author.displayAvatarURL)
                    .setColor(config.doggo)
                    .setImage('https://i.imgur.com/vXRfAd6.gif')

                var namelist = "";
                var desclist = "";
                var rolelist = "";

                let result = jsfile.forEach((f, i) => {
                    let props = require(`./${f}`);
                    namelist = props.help.name;
                    desclist = props.help.description;
                    rolelist = props.help.role

                    // send help text
                    if (rolelist === "fun") {
                        embed3.addField(`**${namelist}**`, `${desclist}`);
                    }
                });

                msg.edit(embed3);
            });
        })

        const utilfilter = (reaction, user) => reaction.emoji.name === '⛏' && user.id === message.author.id;
        const util = msg.createReactionCollector(utilfilter, { time: 10000000 });

        util.on('collect', client3 => {
            fs.readdir("./commands/", (err, files) => {
                if (err) console.log(err);
                let jsfile = files.filter(f => f.split(".").pop() === "js");
                if (jsfile.length <= 0) {
                    return console.log("Couldn't find commands.");
                }

                const embed4 = new Discord.RichEmbed()
                    .setAuthor('Utilities Commands', message.author.displayAvatarURL)
                    .setColor(config.doggo)
                    .setImage('https://i.imgur.com/vXRfAd6.gif')

                var namelist = "";
                var desclist = "";
                var rolelist = "";

                let result = jsfile.forEach((f, i) => {
                    let props = require(`./${f}`);
                    namelist = props.help.name;
                    desclist = props.help.description;
                    rolelist = props.help.role

                    // send help text
                    if (rolelist === "utility") {
                        embed4.addField(`**${namelist}**`, `${desclist}`);
                    }
                });

                msg.edit(embed4);
            });
        })

        const aboutfilter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id;
        const about = msg.createReactionCollector(aboutfilter, { time: 10000000 });

        about.on('collect', client5 => {
            fs.readdir("./commands/", (err, files) => {
                if (err) console.log(err);
                let jsfile = files.filter(f => f.split(".").pop() === "js");
                if (jsfile.length <= 0) {
                    return console.log("Couldn't find commands.");
                }

                const embed5 = new Discord.RichEmbed()
                .setAuthor('Utilities Commands', message.author.displayAvatarURL)
                .setColor(config.doggo)
                .setImage('https://i.imgur.com/vXRfAd6.gif')

                var namelist = "";
                var desclist = "";
                var rolelist = "";

                let result = jsfile.forEach((f, i) => {
                    let props = require(`./${f}`);
                    namelist = props.help.name;
                    desclist = props.help.description;
                    rolelist = props.help.role

                    // send help text
                    if (rolelist === "about") {
                        embed5.addField(`**${namelist}**`, `${desclist}`);
                    }
                });

                msg.edit(embed5);
            });
        })
    });
}

module.exports.help = {
    name: "help",
    role: "about",
    description: "Lists commands."
}