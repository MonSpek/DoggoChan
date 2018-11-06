const Discord = require("discord.js"),
    google = require("google");
const config = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    google.resultsPerPage = 1
    google.protocol = 'https'
    var nextCounter = 0

    google(args, function (err, res) {
        if (err) console.log(err);

        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (link.title == null) {
                return void (0)
            }
            if (link.href == null) {
                return void (0)
            }
            const gEmbed = new Discord.RichEmbed()
                .setAuthor(`Google search result for ${args}`.split(',').join(' '))
                .setColor(config.doggo)
                .setThumbnail('http://www.stickpng.com/assets/images/5847f9cbcef1014c0b5e48c8.png')
                .addField('Website', link.title)
                .addField('Description', link.description)
                .addField('URL', link.href);

            message.channel.send(gEmbed);
        }

        if (nextCounter < 1) {
            nextCounter += 1
            if (res.next) res.next()
        }

    });
}

module.exports.help = {
    name: "google",
    role: "utility",
    description: "I will google something for you"
}