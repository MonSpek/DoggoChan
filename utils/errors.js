const Discord = require("discord.js");
const config = require("../botconfig.json");

//! this file is for handeling embeds for errors

module.exports.logError = (e, bot, ownerID) => {
    let embed = new Discord.RichEmbed()
        .setColor(config.red)
        .setTitle("An Error Has Occured")
        .setDescription(e)

    bot.users.get(ownerID).send(embed);
}

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
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

module.exports.notNsfwChl = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You can use this command only on nsfw channels!")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noAnime = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You did not give me an anime to look up!")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noValMus = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("No or invalid value entered, cancelling video selection.")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.obtainErr = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("I could not obtain any search results.")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.notInVC = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("I\'m sorry but you need to be in a voice channel to use music! commands")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noQueue = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("The queue is empty!")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.nothPlaying = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("There is nothing playing")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantConn = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("I can not connect to the the channel.")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noTar = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You did not give me a user to give money to!")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noAmt = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please input a valid number")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.notEgh = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You do not have enough coins to do that")
        .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}
