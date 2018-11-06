module.exports.run = async (bot, message, args) => {
    bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
}

module.exports.help = {
    name: "join"
}