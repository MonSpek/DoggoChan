const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let music = ["https://www.youtube.com/watch?v=2MHhLDCJ57E", "https://www.youtube.com/watch?v=bSFDRhFReRk", "https://www.youtube.com/watch?v=RhYwLDkxJYA", "https://www.youtube.com/watch?v=pauWX9CKhnc", "https://www.youtube.com/watch?v=cinJDxLUsNY", "https://www.youtube.com/watch?v=89F5fpvwPr0", "https://www.youtube.com/watch?v=W43aQxzjyeM&index=19", "https://www.youtube.com/watch?v=zKNdVQKHsFc", "https://www.youtube.com/watch?v=HIrKSqb4H4A", "https://www.youtube.com/watch?v=vl3L8TxaTU0", "https://www.youtube.com/watch?v=FcIEqDNyG-4", "https://www.youtube.com/watch?v=dNURRlc4XYg"];

	let result = Math.floor((Math.random() * music.length));

	message.channel.send(music[result]);
}
module.exports.help = {
	name: "dg",
	role: "hidden",
	description: "Posts a Death Grips song"
}
