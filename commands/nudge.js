module.exports = {
    name: 'nudge',
    description: 'Nudge to new channel',
    execute(message, args) {
	if (!message.mentions.channels.size) {
	    return message.reply('You need to mention what channel you want to nudge to.');
	}
	const targetChannel = message.mentions.channels.first();
	message.channel.send('.').then(placed => {
	    const jumpsource = `[Click here to jump back to corresponding moment in ${placed.channel}](${placed.url})`;
	    const targetmsg = "Conversation nudged here from another channel.";
	    const targetEmbed = {
		description: `${targetmsg}\n${jumpsource}`,
	    };
	    targetChannel.send({ embed: targetEmbed }).then(sent => {
		const jumptarget = `[Click here to jump over to corresponding moment in ${targetChannel}](${sent.url})`;
		const sourcemsg = "Conversation seems like it might fit better in another channel.";
		const sourceEmbed = {
		    description: `${sourcemsg}\n${jumptarget}`,
		};
		placed.edit({ embed: sourceEmbed });
	    });
	});
    },
};
