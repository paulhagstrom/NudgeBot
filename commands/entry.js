module.exports = {
    name: 'entry',
    description: 'Mark as contest entry',
    execute(message, args) {
	// there must be an attachment
	if (message.attachments.size < 1) return;
	// take the first attachement
	const image = message.attachments.array()[0].url;
	const entryChannel = message.guild.channels.cache.find(channel => channel.name == 'background-entries');
	// see if this author already has an entry
	entryChannel.messages.fetch({ limit: 100 })
	    .then(fetched => {
		const oldEntry = fetched.find(m => m.embeds[0].footer.text.endsWith(message.author.id));
		if (oldEntry) {
		    // if there already is an entry, delete it (along with its votes)
		    // an alternative to deletion might be to mark it as superseded
		    oldEntry.delete()
			.then(msg => console.log('Deleted entry.')).catch(console.error);
		    // oldEntry.react('\u{1F6D1}');
		}
	    });
	const jumpstring = `\n[Jump to original context](${message.url})`;
	const embed = {
	    description: `<@${message.author.id}> ` + message.cleanContent + jumpstring,
	    author: {
		name: message.member.displayName,
		icon_url: message.author.displayAvatarURL(),
	    },
	    timestampe: new Date(),
	    footer: {
		text: `${message.author.id}`,
	    },
	    image: {
		url: image,
	    },
	}
	entryChannel.send({ embed })
	    .then(msg => msg.react('\u{1F44D}'));
    },
};
