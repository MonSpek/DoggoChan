const fetch = require('node-superfetch');

module.exports.run = async (bot, message, args) => {
    let text = args.join(" ");
    if (!text) {
        message.channel.send("You didn't give me any text!").then(msg => {msg.delete(5000)});
    } else {
        //var newText = text.split(' ').join('%20');

        //console.log(newText);

        fetch.get(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${text}`).then(res =>
            message.channel.send({
                "embed": {
                    "color": 545762,
                    "image": {
                        "url": res.body.message
                    }
                }
            }));
    }
}

module.exports.help = {
    name: "kanna"
}