//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { Guild, GuildMember } from 'discord.js';

//* File imports
import {
  memberStatisticChannel,
  onlineStatisticChannel,
} from '../config/constants';

//* -----------------------------------------------------------------------------
//* FUNCTIONS
//* -----------------------------------------------------------------------------

/**
 * Refreshes the server statistics on top of the server.
 *
 * @param {Guild} guild - Server to refresh Statistics in.
 */
async function refreshStatistics(guild: Guild) {
  const members = await guild.members.fetch();

  const memberCount = members.filter(
    (guildMember: GuildMember) => !guildMember.user?.bot
  ).size;

  const onlineCount = members.filter(
    (guildMember: GuildMember) =>
      !guildMember.user?.bot && guildMember.presence?.status === 'online'
  ).size;

  (await guild.channels.fetch(memberStatisticChannel))!.setName(
    `┇Studierende: ${memberCount}`
  );

  (await guild.channels.fetch(onlineStatisticChannel))!.setName(
    `┇Online: ${onlineCount}`
  );
}

//* -----------------------------------------------------------------------------
//* EXPORTS
//* -----------------------------------------------------------------------------

export default refreshStatistics;
