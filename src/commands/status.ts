//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';
import util from 'util';

//* -----------------------------------------------------------------------------
//* CONFIG
//* -----------------------------------------------------------------------------

const wait = util.promisify(setTimeout);

//* -----------------------------------------------------------------------------
//* COMMAND
//* -----------------------------------------------------------------------------

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Setzt den Status und den Statustext.')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('Der angezeigte Statustext.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Der angezeigte Aktivitätstyp.')
        .setRequired(true)
        .addChoice('Spielt', 'PLAYING')
        .addChoice('Streamt', 'STREAMING')
        .addChoice('Hört', 'LISTENING')
        .addChoice('Schaut', 'WATCHING')
        .addChoice('Konkurriert', 'COMPETING')
    )
    .addStringOption((option) =>
      option
        .setName('status')
        .setDescription('Der angezeigte Anwesenheitstyp.')
        .setRequired(true)
        .addChoice('Online', 'online')
        .addChoice('Abwesend', 'idle')
        .addChoice('Unsichtbar', 'invisible')
        .addChoice('Bitte nicht stören', 'dnd')
    ),
  async execute(interaction: BaseCommandInteraction) {
    interaction.client.user!.setPresence({
      activities: [
        {
          // @ts-ignore
          name: interaction.options.getString('name'),
          // @ts-ignore
          type: interaction.options.getString('type'),
        },
      ],
      // @ts-ignore
      status: interaction.options.getString('status'),
    });

    await interaction.reply('Bot status erfolgreich verändert.');
    await wait(2000);
    await interaction.deleteReply();
  },
};
