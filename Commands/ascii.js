const ascii = require("ascii-art");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {
    ascii.font(args.join(" "), "Doom", function (rendered) {
        rendered = rendered.trimRight();
        if (rendered.length > 2000) return message.channel.send("Sorry, this message is too long.");

        message.channel.send(rendered, {
            code: "md"
        });
    });
}

module.exports.help = {
    name: "ascii",
    role: "normal",
	description: "Turn text into ascii"
}