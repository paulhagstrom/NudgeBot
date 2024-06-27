const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
// GUILD_MESSAGES is needed for posting messages
// MESSAGE_CONTENT is needed to repost intro
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.MESSAGE_CONTENT]});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('for !nudge', {type: 'WATCHING'});
    client.user.setUsername('Nudgebot');
    });

client.on('message', message => {
    // ignore bots
    if (message.author.bot) return;
    // if the bot is mentioned, provide a little help
    if (message.mentions.users.size && (message.mentions.users.first()).id === client.user.id) {
	const helpEmbed = {
	    title: 'Nudgebot',
	    description: "This bot does two things. One is providing jump links between channels, to assist in moving a conversation to a more on topic channel.  To use it, type `!nudge #channel` by itself on a line. The second is posting things to <#photo-roster> from <#dorm-lobby>. To use it, type `!intro` followed by your intro text, and attach a single photo if you wish.  This will be reposted in <#photo-roster> for you.  You can replace your entry in <#photo-roster> by doing it again.  Note that this needs to be in a single message, the photo must be attached to the message that begins with `!intro`. This robot can only see single messages.",
	};
	message.reply({ embed: helpEmbed });
	return;
    };
    // filter out non-commands
    if (!message.content.startsWith(config.prefix)) return;
    // get args, though I don't really use these at this point
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
	client.commands.get(command).execute(message, args);
    } catch (error) {
	console.error(error);
	message.reply('?SYNTAX ERROR');
    }
});

client.login(config.token);
