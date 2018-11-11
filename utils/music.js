const Discord = require("discord.js");
const config = require("../botconfig.json");

module.exports.vol = async (message, serverQueue) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription(`**The current volume is:** ***${serverQueue.volume}***`)
        .setColor('RANDOM')
        .setFooter(`Done by ${message.author.username}`)

    message.channel.send(embed).then(m => m.delete(15000));
}

module.exports.volSet = async (message, args) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription(`**I set the volume to:** **__${args[1]}__**`)
        .setColor('RANDOM')
        .setFooter(`Done by ${message.author.username}`)

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.np = async (message, serverQueue) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription(`***Now playing:*** **${serverQueue.songs[0].title}**`)
        .setColor('RANDOM')
        .setFooter(`Done by ${message.author.username}`)

    message.channel.send(embed).then(m => m.delete(11000));
}

module.exports.queue = async (message, serverQueue) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription(`**Now playing: ${serverQueue.songs[0].title}**`)
        .addField(`**Song queue:${serverQueue.songs.map(song => `** >> ** ${song.title}`).join('\n')}`)
        .setColor('RANDOM')
        .setFooter(`Done by ${message.author.username}`)

    message.channel.send(embed).then(m => m.delete(11000));
}
