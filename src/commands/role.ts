//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';

//* -----------------------------------------------------------------------------
//* COMMAND
//* -----------------------------------------------------------------------------

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Creates a role reaction message.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Die angezeigte Nachricht.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reactions')
        .setDescription('Die Emojis in der Reaktion.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('desc')
        .setDescription('Die Beschreibung der Reaktionen.')
        .setRequired(true)
    ),
  async execute(interaction: BaseCommandInteraction) {
    // @ts-ignore
    const title = interaction.options.getString('message');
    // @ts-ignore
    const reactions = interaction.options.getString('reactions').split('-');
    // @ts-ignore
    const desc = interaction.options.getString('desc').split('-');

    let embedDesc = '';
    if (reactions.length === desc.length) {
      for (let i = 0; i < reactions.length; i += 1) {
        embedDesc += `${reactions[i]}  ${desc[i]}\n`;
      }
    } else {
      interaction.reply({
        content: `Die Anzahl der Reaktionen muss der der Beschreibungen entsprechen.`,
        ephemeral: true,
      });
      return;
    }

    try {
      const message = await interaction.channel!.send({
        content: null,
        embeds: [
          {
            title,
            description: embedDesc,
            color: 321378,
            footer: {
              text: 'powered by tobias k.',
            },
          },
        ],
      });

      reactions.forEach((react: string) => {
        message.react(react);
      });

      interaction.reply({
        content: `Die Nachricht wurde Erfolgreich erstellt.`,
        ephemeral: true,
      });
    } catch (e) {
      interaction.reply({
        content: `Huch. Da ist wohl etwas schief gelaufen.`,
        ephemeral: true,
      });
    }
  },
};
