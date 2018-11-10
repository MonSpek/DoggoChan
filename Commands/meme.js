const Discord = require("discord.js"),
    meme = require("memejsfork");

module.exports.run = async (bot, message, args) => {
    meme(function (data) {
        const embed = new Discord.RichEmbed()
            .setTitle(data.title[0])
            .setURL(data.url[0])
            .setDescription(`From ${data.subreddit[0]} by ${data.author[0]}`)
            .setImage(data.url[0])

        message.channel.send(embed).catch(console.error);
    });
}

module.exports.help = {
    name: "meme",
    role: "fun",
    description: "Show those lolis who's boss"
}