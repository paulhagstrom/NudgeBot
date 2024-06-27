module.exports = {
    name: 'nudge',
    description: 'Nudge to new channel',
    execute(message, args) {
	if (!message.mentions.channels.size) {
	    return message.reply('You need to mention what channel you want to nudge to.');
	}
	const targetChannel = message.mentions.channels.first();
	const emptyEmbed = {
	    description: "Placeholder for jump link.",
	    };
	message.channel.send({embed: emptyEmbed}).then(placed => {
	    const jumpsource = `Corresponding moment in ${placed.url.replace("discordapp.com", "discord.com")}`;
	    const targetmsg = "Conversation nudged here from another channel.";
	    const targetEmbed = {
		description: `${targetmsg}\n${jumpsource}`,
	    };
	    targetChannel.send({ embed: targetEmbed }).then(sent => {
	    //targetChannel.send(`${targetmsg}\n${jumpsource}`).then(sent => {
		const jumptarget = `Corresponding moment in ${sent.url.replace("discordapp.com", "discord.com")}`;
		const sourcemsg = "Conversation seems like it might fit better in another channel.";
		const sourceEmbed = {
		    description: `${sourcemsg}\n${jumptarget}`,
		};
		placed.edit({ embed: sourceEmbed });
		//placed.edit(`${sourcemsg}\n${jumptarget}`);
	    });
	});
    },
};
