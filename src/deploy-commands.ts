//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
import fs from 'fs';

//* -----------------------------------------------------------------------------
//* CONFIGURATION
//* -----------------------------------------------------------------------------

dotenv.config({ path: './config/index.env' });

//* -----------------------------------------------------------------------------
//* DEPLOY COMMANDS
//* -----------------------------------------------------------------------------

const commands: any[] = [];
fs.readdirSync('./commands')
  .filter((file: string) => file.endsWith('.js'))
  .forEach((file) => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  });

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

rest.put(
  Routes.applicationGuildCommands(
    process.env.CLIENT_ID!,
    process.env.GUILD_ID!
  ),
  {
    body: commands,
  }
);
