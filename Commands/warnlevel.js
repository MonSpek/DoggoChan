const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return errors.cantfindUser(message.channel);
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`).then(msg => {msg.delete(5000)});;

}

module.exports.help = {
  name: "warnlevel"
}
