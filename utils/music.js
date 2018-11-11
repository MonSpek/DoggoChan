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

module.exports.pause = async (message) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription("⏸ Paused the music for you!")
        .setColor('RANDOM')
        .setFooter(`Done by ${message.author.username}`)

    message.channel.send(embed).then(m => m.delete(11000));
}

module.exports.resume = async (message) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription("▶ Resumed the music for you!")
        .setFooter(`Done by ${message.author.username}`)
        .setColor('RANDOM')

    message.channel.send(embed).then(m => m.delete(11000));
}

module.exports.addQueue = async (message, song) => {
    await message.delete();

    const embed = new Discord.RichEmbed()
        .setDescription(`**${song.title}** has been added to the queue!`)
        .setFooter(`Done by ${message.author.username}`)
        .setColor('RANDOM')

    message.channel.send(embed).then(m => m.delete(20000));
}

module.exports.startPlay = (serverQueue, song) => {
    const embed = new Discord.RichEmbed()
        .setDescription(`Started Playing: **${song.title}**`)
        .setColor('RANDOM')

    serverQueue.textChannel.send(embed).then(m => m.delete(15000));
}