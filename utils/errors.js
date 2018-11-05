const Discord = require("discord.js");
const fs = require("fs");
const config = require("../botconfig.json")

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(botconfig.red)
        .setTitle("NO PERMS")
        .addField("Insufficent permission", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You cannot ban a bot.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Could not find that user.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please supply a reason.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noText = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please give me some text!")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.notFound = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Sorry, nothing was found.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.bannedWord = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription(`${message.author.toString()} that word is not allowed`)
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.emptyQuestion = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Bork! Please give me a full question!")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noCalc = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please give me something to solve")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.inValCalc = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Invalid Calculation")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noApiText = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please give me some text!")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}