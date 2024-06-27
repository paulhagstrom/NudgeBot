module.exports = {
    name: 'intro',
    description: 'Submit introduction to roster channel',
    execute(message, args) {
        // posts from #dorm-lobby go to #photo-roster
        monitorChannel = message.guild.channels.cache.find(c => c.name == 'hey-robot');
        targetChannel = message.guild.channels.cache.find(c => c.name == 'photo-roster');
        if (message.channel != monitorChannel) {
            return message.reply(`The !intro command only works in <#${monitorChannel.id}>.`);
        }
        // use attachment if there is one (take the first one)
        const imgAttached = (message.attachments.size > 0) ? {url: message.attachments.array()[0].url} : {};
        const actString = 'added to';
        // see if this author already has an entry
        targetChannel.messages.fetch({ limit: 100 })
            .then(fetched => {
                const oldEntry = fetched.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text.endsWith(message.author.id));
                if (oldEntry) {
                    // if there already is an entry, delete it (along with its votes)
                    // an alternative to deletion might be to mark it as superseded
                    oldEntry.delete()
                        .then(msg => console.log('Deleted entry.')).catch(console.error);
                    actString = 'replaced in';
                }
            });
        const jumpstring = `\nOriginal context: ${message.url.replace("discordapp.com", "discord.com")}`;
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
        targetChannel.send({ embed: photoEmbed });
        monitorChannel.send(`Message ${actString} <#photo-roster>`);
    },
};
