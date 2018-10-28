const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_SERVER")) return errors.noPerms(message, "MANAGE_SERVER");
  if(!args[0]) return message.reply("Add a desired prefix!");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor(botconfig.doggo)
  .setTitle("A new prefix has been set!")
  .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed);
}

module.exports.help = {
  name: "prefix"
}
