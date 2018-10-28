const Discord = require ("discord.js");
const superagent = require("superagent");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot,message,args) => {
  let {body} = await superagent
  .get(`http:\/\/aws.random.cat\/meow`);

  let dogEmbed = new Discord.RichEmbed()
  .setColor(botconfig.doggo)
  .setTitle("MEOW!")
  .setImage(body.file);

  message.channel.send(dogEmbed);
}

module.exports.help = {
  name: "meow"
}
