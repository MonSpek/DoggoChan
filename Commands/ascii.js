const ascii = require("ascii-art");
const Discord = require("discord.js");
const bList = require("../assets/blacklist.json");

module.exports.run = async (bot, message, args, ops) => {
    if(message.guild.id === "498112893330391041"){
        let wordfound = false;
        for(var i in bList.words) {
          if(message.content.toLowerCase().includes(bList.words[i].toLowerCase())) wordfound = true;
        }
    
        if(wordfound) return;
    }

    ascii.font(args.join(" "), "Doom", function(rendered) {
        rendered = rendered.trimRight();
        if(rendered.length > 2000) return message.channel.send("Sorry, this message is too long.");

        message.channel.send(rendered, {
            code: "md"
        });
    });
}

module.exports.help = {
    name: "ascii"
}