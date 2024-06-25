# NudgeBot

This is a Discord bot written for KansasFest 2020.
And then updated for KansasFest 2024.

It handles two commands at present. `!nudge` and `!intro`.

```
!nudge #new-channel
```

will create a bi-directional link between the current channel and the new-channel,
to help in moving a conversation from an off-topic area to an on-topic area.

```
!intro (text...)
```

will place an attached image into #photo-roster
A second invocation of !entry will replace the previous entry, only one entry per author.

Compilation and installation notes, for myself, because I don't really do node/JS development,
and so I only return to this every couple of years, at which point everything involved has
gone through three major revisions with breaking updates.

- Because I depend on the Discord API and Discord itself changed, `discord.js` needs to be updated.  This code was updated for `discord.js` 14 from its previous `discord.js` 12 version.
- The node installation on the host is updated by `docker pull node` -- the Dockerfile specifies only `latest` and so will pick up the change.
- Updating the `discord.js` version in `package.json` will pull in the updated `discord.js` when the container is spun up using `docker-compose.yml` (it installs node dependencies using `npm` as it is brought up).

Historical notes of little interest:

The `!intro` command was repurposed from a command called `!entry`, some traces still there.
`!entry` was a submission and voting system that allowed for voting by reaction,
and so added a reaction.  The `!intro` code could be re-repurposed for `!entry` into a similar channel.
