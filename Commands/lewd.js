const Discord = require("discord.js"),
    superagent = require("superagent"),
    send = require("quick.hook");
const errors = require("../utils/errors.js"),
    config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let { body } = await superagent
        .get(`https://nekos.life/api/lewd/neko`);
    if (!message.channel.nsfw) return errors.notNsfwChl(message);

    let hentaiEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setColor(config.doggo)
        .setTitle("UwU what's this?")
        .setImage(body.neko);

    message.channel.send(hentaiEmbed);
}

module.exports.help = {
    name: "lewd",
    role: "nsfw",
    description: "Lists commands."
}