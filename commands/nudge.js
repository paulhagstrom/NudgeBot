module.exports = {
    name: 'nudge',
    description: 'Nudge to new channel',
    execute(message, args) {
	if (!message.mentions.channels.size) {
	    return message.reply('You need to mention what channel you want to nudge to.');
	}
	const targetChannel = message.mentions.channels.first();
	message.channel.send('.').then(placed => {
	    const jumpsource = `Corresponding moment in ${placed.url}`;
	    const targetmsg = "Conversation nudged here from another channel.";
	    const targetEmbed = {
		description: `${targetmsg}\n${jumpsource}`,
	    };
	    targetChannel.send({ embeds: [targetEmbed] }).then(sent => {
		const jumptarget = `Corresponding moment in ${sent.url}`;
		const sourcemsg = "Conversation seems like it might fit better in another channel.";
		const sourceEmbed = {
		    description: `${sourcemsg}\n${jumptarget}`,
		};
		placed.edit({ embeds: [sourceEmbed] });
	    });
	});
    },
};
