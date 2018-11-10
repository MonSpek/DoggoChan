const Discord = require("discord.js");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    var voiceChannel = message.member.voiceChannel;

    //* Checks
    if (!voiceChannel) return errors.notInVC(message); //* Checks if user is in VC
    if (!message.guild.me.voiceChannel) return errors.botNotInVC(message); //* Checks if bot is in VC
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return errors.diffVC(message); //* Checks if user is in the same VC as the bot

    message.guild.me.voiceChannel.leave();

    const leaveEmbed = new Discord.RichEmbed()
        .setDescription("Leaving Channel...")
        .setFooter(`Done by ${message.author.username}`)
        .setColor('RANDOM')

    message.channel.send(leaveEmbed);
}

module.exports.help = {
    name: "leave",
    role: "music",
    description: "Leavs the server."
}