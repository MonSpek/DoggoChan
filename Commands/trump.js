const fetch = require('node-superfetch');
const errors = require('../utils/errors.js');

module.exports.run = async (bot, message, args) => {
    let text = args.join(" ");
    if (!text) {
        errors.noApiText(message);
    } else {
        fetch.get(`https://nekobot.xyz/api/imagegen?type=TrumpTweet&text=${text}`).then(res =>
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
    name: "trump",
    role: "normal",
    description: "Makes trump tweet anything"
}