const Discord = require("discord.js"),
    malScraper = require("mal-scraper");
const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const search = `${args}`;

    malScraper.getInfoFromName(search)
        .then((data) => {
            const malEmbed = new Discord.RichEmbed()
                .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
                .setThumbnail(data.picture)
                .setColor(config.doggo)
                .addField('English Title', data.englishTitle, true)
                .addField('Japanese Title', data.japaneseTitle, true)
                .addField('Type', data.type, true)
                .addField('Episodes', data.episodes, true)
                .addField('Rating', data.rating, true)
                .addField('Aired', data.aired, true)
                .addField('Score', data.score, true)
                .addField('Score Stats', data.scoreStats, true)
                .addField('Link', data.url);

            message.channel.send(malEmbed);
        })
        .catch((err) => console.log(err));
}

module.exports.help = {
    name: "anime",
    role: "utility",
    description: "I will look an anime up for you."
}