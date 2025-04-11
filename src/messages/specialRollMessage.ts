import { codeBlock } from 'discord.js';

const buildSpecialRollMessage = (roll: string) => ({
  content: codeBlock('markdown', `# ${roll}`),
});

export default buildSpecialRollMessage;
