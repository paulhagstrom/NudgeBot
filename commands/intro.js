module.exports = {
    name: 'intro',
    description: 'Submit introduction to roster channel',
    execute(message, args) {
        // posts from #hey-robot go to #photo-roster
        monitorChannel = message.guild.channels.cache.find(c => c.name == 'hey-robot');
        targetChannel = message.guild.channels.cache.find(c => c.name == 'photo-roster');
        if (message.channel != monitorChannel) return;
        // use attachment if there is one
        if (message.attachments.size > 0) {
            // take the first attachement
            const image = {
                url: message.attachments.array()[0].url,
            };
        } else {
            const image = {};
        }
        // see if this author already has an entry
        targetChannel.messages.fetch({ limit: 100 })
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
            timestamp: new Date(),
            footer: {
                text: `${message.author.id}`,
            },
            image: image,
        }
        targetChannel.send({ embed });
        // This used to be tacked on to set up the first vote reaction.  No longer a vote though.
        //    .then(msg => msg.react('\u{1F44D}'));
    },
};
