module.exports = {
    name: 'intro',
    description: 'Submit introduction to roster channel',
    execute(message, args) {
        // posts from #dorm-lobby go to #photo-roster
        monitorChannel = message.guild.channels.cache.find(c => c.name == 'hey-robot');
        targetChannel = message.guild.channels.cache.find(c => c.name == 'photo-roster');
	message.reply(`Monitoring <#${monitorChannel.id}> and targeting <#${targetChannel.id}>.`);
        if (message.channel != monitorChannel) {
            return message.reply(`The !intro command only works in <#${monitorChannel.id}>.`);
        }
        // use attachment if there is one (take the first one)
        const imgAttached = (message.attachments.size > 0) ? {url: message.attachments.array()[0].url} : {};
	message.reply(`Attachments: ${imgAttached.length}.`);
        // see if this author already has an entry
        targetChannel.messages.fetch({ limit: 100 })
            .then(fetched => {
                //const oldEntry = fetched.find(m => m.embeds[0].footer.text.endsWith(message.author.id));
                //const oldEntry = fetched.filter(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text.endsWith(message.author.id));
                const oldEntry = fetched.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text.endsWith(message.author.id));
                //if (oldEntry.length > 0) {
                if (oldEntry) {
                    // if there already is an entry, delete it (along with its votes)
                    // an alternative to deletion might be to mark it as superseded
		    message.reply("DELETING OLD MESSAGE!");
                    oldEntry.delete()
                    //oldEntry[0].delete()
                        .then(msg => console.log('Deleted entry.')).catch(console.error);
                    // oldEntry.react('\u{1F6D1}');
                }
            });
	message.reply("DONE CHECKING FOR OLD MESSAGES!");
        const jumpstring = `\nOriginal context: ${message.url.replace("discordapp.com", "discord.com")}`;
	message.reply(`Author ${message.member.displayName} id: ${message.author.id}`);
//	return message.reply("ENDING EARLY!");
        const photoEmbed = {
            description: `<@${message.author.id}> ` + message.cleanContent.replace(/\!intro\ /i,'') + jumpstring,
            author: {
                name: message.member.displayName,
                icon_url: message.author.displayAvatarURL(),
            },
            timestamp: new Date(),
	    image: imgAttached,
            footer: {
                text: `${message.author.id}`,
            },
        };
//	return message.reply("ENDING EARLY!");
        targetChannel.send({ embed: photoEmbed });
//        targetChannel.send({ embeds: [photoEmbed] });
//        targetChannel.send({ content: "Photo roster addition.", embeds: [photoEmbed] });
//        targetChannel.send({ content: "Photo roster addition.", embeds: [photoEmbed], files: imgAttached });
//        targetChannel.send("Photo roster addition.", { embeds: [photoEmbed] });
//        targetChannel.send("Addition to the photo roster, placeholder edition.");
        // This used to be tacked on to set up the first vote reaction.  No longer a vote though.
        //    .then(msg => msg.react('\u{1F44D}'));
    },
};
