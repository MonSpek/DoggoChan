const math = require('mathjs'),
    Discord = require('discord.js');
const errors = require("../utils/errors.js"),
    config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return errors.noCalc(message);

    let resp;
    try {
        resp = math.eval(args.join(' '));
    } catch (e) {
        return errors.inValCalc(message);
    }

    const embed = new Discord.RichEmbed()
        .setColor(config.doggo)
        .setAuthor(message.author.username)
        .setTitle("**Answer**:")
        .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)

    message.channel.send(embed);
}

module.exports.help = {
	name: "calc",
	role: "normal",
	description: "Does calculations."
}
