const Discord = require("discord.js"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/DoggoChan', {
    useNewUrlParser: true
});

const Money = require("../models/money.js");
const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    await message.delete();

    Money.find({
        serverID: message.guild.id
    }).sort([
        ['coins', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.RichEmbed()
            .setTitle("Coin leaderboard")
            .setThumbnail(message.guild.iconURL);

        if (res.length === 0) {
            embed.setColor(config.red);
            embed.addField("No data found", "Please get some coins.")
        } else if (res.length < 10) {
            embed.setColor(config.doggo);
            for (i = 0; i < res.length; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left"
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].money}`);
                }
            }
        } else {
            embed.setColor(config.doggo);
            for (i = 0; i < 10; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left"
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].money}`);
                }
            }
        }

        message.channel.send(embed).then(msg => { msg.delete(10000) });
    })
}

module.exports.help = {
    name: "leader",
    roles: "about",
    description: "Gives a coin leaderboard"
}