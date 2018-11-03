const Discord = require("discord.js");
const fs = require("fs");

// TODO: port the json system to the mongooseDB

module.exports.run = async (bot, message, args) => {
  //!pay @isatisfied 59345

  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[1]) return message.reply("Not enough coins there!");

  if(isNaN(args[1])) {
    return message.reply("This is not a number! GRR!!");
  }
  if(args[1] <= 0) {
    return message.reply("That number will not work!")
  }
  if(pUser.id == message.author.id) {
    return message.reply("You can't send to your self!")
  }

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}
