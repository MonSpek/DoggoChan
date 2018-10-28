const Discord = require("discord.js");
let coins = require("../coins.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(botconfig.doggo)
  .addField("💸", uCoins);

  message.delete().catch(O_o=>{});
  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "coins"
}
