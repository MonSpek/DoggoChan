const Discord = require("discord.js"),
    request = require('request');
const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let cn = request("http://api.adviceslip.com/advice", function (err, res, body) {
        try {
            let cnj = JSON.parse(body)
            // message.channel.send(cnj.slip.advice).then(msg => { msg.delete(20000) })
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                .setDescription(`**${cnj.slip.advice}**`)
                .setColor(config.doggo)

            message.channel.send(embed).then(msg => { msg.delete(10000) });
        } catch (e) {
            return send("**Advice machine :b:roke**")
        }
    });

    await message.delete();
}

module.exports.help = {
    name: "advice",
    role: "fun",
    description: "I will give you advice"
}