//* -----------------------------------------------------------------------------
//* DEPENDENCIES
//* -----------------------------------------------------------------------------

//* Node modules
import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

//* -----------------------------------------------------------------------------
//* CONFIGURATION
//* -----------------------------------------------------------------------------

dotenv.config({ path: './config/index.env' });

//* -----------------------------------------------------------------------------
//* SERVER
//* -----------------------------------------------------------------------------

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,

    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,

    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

// @ts-ignore
client.commands = new Collection();

fs.readdirSync('./commands')
  .filter((file: string) => file.endsWith('.js'))
  .forEach((file: string) => {
    const command = require(`./commands/${file}`);
    // @ts-ignore
    client.commands.set(command.data.name, command);
  });

fs.readdirSync('./events')
  .filter((file: string) => file.endsWith('.js'))
  .forEach((file: string) => {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });

client.login(process.env.DISCORD_TOKEN);
