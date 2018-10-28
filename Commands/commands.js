const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const back = "⬅";
const next = "➡";

module.exports.run = async (bot, message, args) => {
  message.delete();

  let bicon = bot.user.displayAvatarURL;
  let commandEmbed = new Discord.RichEmbed()
  .setDescription("Bot Commands")
  .setColor(botconfig.doggo)
  .setThumbnail(bicon)
  .addField(".botinfo", "Gives info on me!")
  .addField("serverinfo", "Gives info on the server.")
  .addField(".report", "Allows users to report a user to the mods.")
  .addField(".woof", "Returns a dog pic")
  .addField(".meow", "Returns a cat pic")
  .addField(".8ball", "Answers a user's question")
  .addField(".dg", "It's Death Grips bitch!!")
  .addField(".pay", "Sends a user coins!")
  .addField(".coins", "Checks how many coins you have!")
  .addField(".kick", "Kicks a user (ADMINS ONLY!!)")
  .addField(".ban", "Bans a user (ADMINS ONLY!!)")
  .addField(".tempmute", "Temperally mutes a user (ADMINS ONLY!!)")
  .addField(".addrole", "Gives a user a role (ADMINS ONLY!!)")
  .addField(".removerole", "Removes a role from a user (ADMIN ONLY!!)")
  .addField(".warn", "Warns a user and punishes them accordingly (ADMIN ONLY!!)")
  .addField(".warnlevel", "Check a user's warning level (ADMIN ONLY!!)")
  .addField(".clear", "Clears x amounts of messages")
  .addField(".say", "Get me to say anything (ADMINS ONLY!!)");

  message.channel.send(commandEmbed)
}

module.exports.help = {
  name:"commands"
}
