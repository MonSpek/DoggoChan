const Discord = require("discord.js"),
    arraySort = require("array-sort"),
    table = require("table")
    config = require("../botconfig.json");

module.exports.run = async (bot, message, args, tools) => {
    let invites = await message.guild.fetchInvites();

    invites = invites.array();

    arraySort(invites, "users", {reverse: true});

    let possibleInvites = [["User", "Uses"]];
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses])
    })

    const embed = new Discord.RichEmbed()
        .setColor(config.doggo)
        .setTitle("Server Invites")
        .addField("leaderboard", `\`\`\`\`\`${table.table(possibleInvites)}\`\`\`\`\``);
    
        message.channel.send(embed);
}

module.exports.help = {
    name: "invites"
}