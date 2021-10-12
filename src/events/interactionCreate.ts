//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { CommandInteraction, Interaction } from 'discord.js';

//* -----------------------------------------------------------------------------
//* FUNCTIONS
//* -----------------------------------------------------------------------------

async function handleCommandInteraction(interaction: CommandInteraction) {
  // @ts-ignore
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}

//* -----------------------------------------------------------------------------
//* EVENT
//* -----------------------------------------------------------------------------

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      handleCommandInteraction(interaction);
    }
  },
};
