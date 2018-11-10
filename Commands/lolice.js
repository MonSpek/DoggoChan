const fetch = require('node-superfetch');

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!user) {
        fetch.get(`https://nekobot.xyz/api/imagegen?type=lolice&url=${message.author.avatarURL}`).then(res =>
            message.channel.send({
                "embed": {
                    "color": 545762,
                    "image": {
                        "url": res.body.message
                    },
                    "footer": {
                        "text": `Done by ${message.author.username}`
                    }
                }
            }));
    } else {
        fetch.get(`https://nekobot.xyz/api/imagegen?type=lolice&url=${user.avatarURL}`).then(res =>
            message.channel.send({
                "embed": {
                    "color": 545762,
                    "image": {
                        "url": res.body.message
                    },
                    "footer": {
                        "text": `Done by ${message.author.username}`
                    }
                }
            }));
    }
}

module.exports.help = {
    name: "lolice",
    role: "fun",
    description: "Show those lolis who's boss"
}