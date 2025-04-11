/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

import botCommands from './commands';

const main = async () => {
  const client = new Client(
    {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    },
  );

  const TOKEN = process.env.BOT_TOKEN;

  client.login(TOKEN);

  client.once('ready', () => {
    console.info(`Logged in as ${client?.user?.tag}`);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }

    const { content } = message;

    if (content[0] !== '!' || (!content.includes('d') && !content.includes('loc'))) {
      return;
    }

    try {
      if (content.includes('dmg') || content.includes('loc')) {
        botCommands.specialRoll.execute(message);
      } else {
        botCommands.roll.execute(message);
      }
    } catch (error) {
      console.error(`There was an error trying to execute command : ${content}`);
      console.error(error);
    }
  });
};

main();
