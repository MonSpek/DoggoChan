const request = require('request');

module.exports.run = async (bot, message, args) => {
    let cn = request("http://api.adviceslip.com/advice", function(err, res, body) {
        try {
            let cnj = JSON.parse(body)
            message.channel.send(cnj.slip.advice)
        } catch (e) {
            return send("**Advice machine :b:roke**")
        }
    });
}

module.exports.help = {
    name: "advice",
    role: "fun",
    description: "I will give you advice"
}