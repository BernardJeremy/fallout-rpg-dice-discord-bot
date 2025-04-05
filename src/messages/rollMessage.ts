import { codeBlock } from 'discord.js';
import { Roll } from '../types/command.types';

const buildRollMessage = (rolls: Roll[]) => {
  const rollsValue = rolls.reduce((conputingRollValue: number, currentRoll: Roll) => (
    conputingRollValue + currentRoll.rollValue
  ), 0);
  const rollsDetailsStr = rolls.reduce((detailsStr: string, currentRoll: Roll) => (
    `${detailsStr}[d${currentRoll.diceValue} (${currentRoll.rollValue})]`
  ), 'Details:');

  return {
    content: codeBlock('markdown', `# ${rollsValue}
${rollsDetailsStr}`),
  };
};

export default buildRollMessage;
