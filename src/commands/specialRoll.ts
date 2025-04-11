import { ChannelType, Message } from 'discord.js';
import buildSpecialRollMessage from '../messages/specialRollMessage';
import { damageDice, Lang, locationDice } from '../tools/specialRollLabel';

function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export default {
  name: 'specialRoll',

  description: 'Roll a Fallout RPG dice',

  async execute(message: Message) {
    let LANG: Lang = process.env.LANG as Lang || 'EN' as Lang;

    if (!damageDice[LANG] || !locationDice[LANG]) {
      LANG = 'EN';
    }

    if (message.channel.type !== ChannelType.GuildText) {
      return;
    }

    if (message.content.includes('dmg')) {
      await message.channel.send(buildSpecialRollMessage(getRandomElement(damageDice[LANG]) || ''));
    } else if (message.content.includes('loc')) {
      await message.channel.send(buildSpecialRollMessage(getRandomElement(locationDice[LANG]) || ''));
    } else {
      await message.channel.send(`Unknown special roll : ${message.content}`);
    }
  },
};
