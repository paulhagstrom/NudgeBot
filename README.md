# NudgeBot

This is a Discord bot written for KansasFest 2020.

It handles two commands at present.

!nudge #new-channel

will create a bi-directional link between the current channel and the new-channel,
to help in moving a conversation from an off-topic area to an on-topic area.

!intro (text...)

will place an attached image into #photo-roster
A second invocation of !entry will replace the previous entry, only one entry per author.

(!intro was repurposed from a command called !entry, some traces still there.
!entry was a submission and voting system that allowed for voting by reaction,
and so added a reaction.  The !intro code could be re-repurposed for !entry into a similar channel.)
