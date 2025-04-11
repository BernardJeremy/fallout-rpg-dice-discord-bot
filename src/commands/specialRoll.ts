import { ChannelType, Message } from 'discord.js';
import buildSpecialRollMessage from '../messages/specialRollMessage';

const damageDice = [
  'No Damage !',
  'No Damage !',
  'One Damage !',
  'Two Damage !',
  'Damage Effect !',
  'Damage Effect !',
];

const locationDice = [
  'Head',
  'Head',
  'Torso',
  'Torso',
  'Torso',
  'Torso',
  'Torso',
  'Torso',
  'Left Arm',
  'Left Arm',
  'Left Arm',
  'Right Arm',
  'Right Arm',
  'Right Arm',
  'Left Leg',
  'Left Leg',
  'Left Leg',
  'Right Leg',
  'Right Leg',
  'Right Leg',
];

function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export default {
  name: 'specialRoll',

  description: 'Roll a Fallout RPG dice',

  async execute(message: Message) {
    if (message.channel.type !== ChannelType.GuildText) {
      return;
    }

    if (message.content.includes('dmg')) {
      await message.channel.send(buildSpecialRollMessage(getRandomElement(damageDice) || ''));
    } else if (message.content.includes('loc')) {
      await message.channel.send(buildSpecialRollMessage(getRandomElement(locationDice) || ''));
    } else {
      await message.channel.send(`Unknown special roll : ${message.content}`);
    }
  },
};
