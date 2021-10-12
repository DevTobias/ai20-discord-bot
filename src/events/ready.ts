//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules

import { Client } from 'discord.js';
import refreshStatistics from '../utils/refreshStatistics';

//* File imports
import { guildID } from '../config/constants';

//* -----------------------------------------------------------------------------
//* EVENT
//* -----------------------------------------------------------------------------

module.exports = {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    console.log(`Ready! Logged in as ${client!.user!.tag}`);

    const guild = await client.guilds.fetch(guildID);
    refreshStatistics(guild);
    setInterval(async () => refreshStatistics(guild), 180000);
  },
};
