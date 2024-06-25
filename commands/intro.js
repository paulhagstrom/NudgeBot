module.exports = {
    name: 'intro',
    description: 'Submit introduction to roster channel',
    execute(message, args) {
        // posts from #corcoran-lobby go to #photo-roster
        monitorChannel = message.guild.channels.cache.find(c => c.name == 'corcoran-lobby');
        targetChannel = message.guild.channels.cache.find(c => c.name == 'photo-roster');
        if (message.channel != monitorChannel) return;
        // use attachment if there is one (take the first one)
        const imgAttached = (message.attachments.size > 0) ? {url: message.attachments.array()[0].url} : '';
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
            description: `<@${message.author.id}> ` + message.cleanContent.replace(/\!intro\ /i,'') + jumpstring,
            author: {
                name: message.member.displayName,
                icon_url: message.author.displayAvatarURL(),
            },
            timestamp: new Date(),
            footer: {
                text: `${message.author.id}`,
            },
            image: imgAttached,
        }
        targetChannel.send({ emdbeds: [embed] });
        // This used to be tacked on to set up the first vote reaction.  No longer a vote though.
        //    .then(msg => msg.react('\u{1F44D}'));
    },
};
