const fetch = require('node-superfetch');

module.exports.run = async (bot, message, args) => {
    let image = args[0];
    if (!image) {
        fetch.get(`https://nekobot.xyz/api/imagegen?type=iPhoneX&url=${message.author.avatarURL}`).then(res =>
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
        fetch.get(`https://nekobot.xyz/api/imagegen?type=iPhoneX&url=${image}`).then(res =>
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
    name: "iphone",
    role: "fun",
    description: "Puts a picture on an iPhone screen"
}