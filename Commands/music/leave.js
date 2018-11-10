const Discord = require("discord.js");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    var voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return errors.notInVC(message);
    if (!message.guild.me.voiceChannel) return errors.botNotInVC(message);
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return errors.diffVC(message);

    message.guild.me.voiceChannel.leave();

    const playingEmbed = new Discord.RichEmbed()
        .setDescription("Leaving Channel...")
        .setFooter(`Done by ${message.author.username}`)
        .setColor('RANDOM')

    message.channel.send(playingEmbed);
}

module.exports.help = {
    name: "leave",
    role: "music",
    description: "Leavs the server."
}