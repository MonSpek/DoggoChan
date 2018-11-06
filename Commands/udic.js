const Discord = require("discord.js"),
    urban = require("relevant-urban");
const errors = require("../utils/errors.js"),
    config = require("../botconfig.json");

module.exports.run = async (bot, message, args, tools) => {
    if(!args[0]) return errors.noText(message.channel);

    let res = await urban(args.join(" ")).catch(e => {
        return errors.notFound(message.channel);
    });

    const embed = new Discord.RichEmbed()
        .setColor(config.doggo)
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`**Description:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
        .addField("Author", res.author, true)
        .addField("Rating", `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`);

    if (res.tags.length > 0 && res.tags.join(", ").length < 1024) {
        embed.addField("Tags", res.tags.join(", "), true)
    }

    message.channel.send(embed);
}
module.exports.help = {
    name: "udic",
    role: "fun", 
    description: "Looks something up on Urban Dictionary"
}