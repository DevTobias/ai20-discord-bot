//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { MessageReaction, User } from 'discord.js';

//* File imports
import { guildID, wiRole, iiRole, miRole } from '../config/constants';

//* -----------------------------------------------------------------------------
//* FUNCTIONS
//* -----------------------------------------------------------------------------

const roles = new Map<string, string>();
roles.set('📐', iiRole);
roles.set('📈', wiRole);
roles.set('🎨', miRole);

/**
 * Removes oder adds a role if it was defined.
 *
 * @param {MessageReaction} reaction - Reaction to specific message.
 * @param {User} user - User which reacted to message.
 * @param {boolean} add - Add oder remove the message.
 */
async function handleReaction(
  reaction: MessageReaction,
  user: User,
  add: boolean
) {
  const emoji = roles.get(reaction.emoji.name || '');

  if (!emoji || user.bot) return;

  reaction.client.guilds.fetch(guildID).then((guild) => {
    guild.members.fetch(user.id).then((member) => {
      if (add) member.roles.add(emoji);
      else member.roles.remove(emoji);
    });
  });
}

//* -----------------------------------------------------------------------------
//* EXPORTS
//* -----------------------------------------------------------------------------

export default handleReaction;
