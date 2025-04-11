import { ChannelType, inlineCode, Message } from 'discord.js';
import buildRollMessage from '../messages/rollMessage';
import getRandomInt from '../tools/utils';
import { Roll } from '../types/command.types';

export default {
  name: 'roll',

  description: 'Roll the dice',

  async execute(message: Message) {
    if (message.channel.type !== ChannelType.GuildText) {
      return;
    }

    const contentArgs = message.content.substring(1).split('d').filter((arg: string) => arg);

    let diceCount = 1;
    let diceValue = 0;

    if (contentArgs.length === 1) {
      diceValue = parseInt(contentArgs[0], 10);
    } else if (contentArgs.length === 2) {
      diceCount = parseInt(contentArgs[0], 10);
      diceValue = parseInt(contentArgs[1], 10);
    } else {
      message.channel.send(inlineCode(`Format error : ${message.content}`));
      return;
    }

    if (Number.isNaN(diceCount) || Number.isNaN(diceValue) || diceCount < 1 || diceValue < 1) {
      message.channel.send(inlineCode(`Format error : ${message.content}`));
      return;
    }

    const rolls : Roll[] = [];

    for (let i = 0; i < diceCount; i += 1) {
      rolls.push({
        diceCount,
        diceValue,
        rollValue: getRandomInt(1, diceValue),
      });
    }

    message.channel.send(buildRollMessage(rolls));
  },
};
