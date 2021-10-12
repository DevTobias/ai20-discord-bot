//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { MessageReaction, User } from 'discord.js';

//* File imports
import { roleChannel } from '../config/constants';
import handleReaction from '../utils/handleReaction';

//* -----------------------------------------------------------------------------
//* EVENT
//* -----------------------------------------------------------------------------

module.exports = {
  name: 'messageReactionAdd',
  once: false,
  async execute(reaction: MessageReaction, user: User) {
    if (reaction.message.channelId === roleChannel) {
      handleReaction(reaction, user, true);
    }
  },
};
