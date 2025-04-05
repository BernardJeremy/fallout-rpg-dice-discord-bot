import { Message } from 'discord.js';

interface ExecuteFunc {
  (message: Message): Promise<void>;
}

export interface Roll {
  diceCount: number,
  diceValue: number,
  rollValue: number,
}

export interface Command {
  name: string,
  description: string,
  alias?: string,
  format?: string
  noHelp?: boolean
  allowedChannels?: string[]
  execute: ExecuteFunc
}
