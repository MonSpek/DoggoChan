const Discord = require("discord.js"),
    ytdl = require("ytdl-core");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    var voiceChannel = message.member.voiceChannel;

    //* Checks
    if (!voiceChannel) return errors.notInVC(message); //* Checks if the user is in a VC.
    if (!args[0]) return errors.noMuURL(message); //* Checks if a url is sent
    //* Validation
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return errors.invURL(message); //* Checks if the URL is valid

    //* Vars
    let info = await ytdl.getInfo(args[0]); //* Gets video info
    let connection = await voiceChannel.join(); //* Stores guild channel
    let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));

    const playingEmbed = new Discord.RichEmbed()
        .setDescription(`Now Playing ${info.title}`)
        .setFooter(`Done by ${message.author.username}`)
        .setColor('RANDOM')

    message.channel.send(playingEmbed);
}

module.exports.help = {
    name: "play",
    role: "music",
    description: "plays a song"
}