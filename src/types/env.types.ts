declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',
      BOT_TOKEN: string, // Discord bot token
      LANG: string, // Special roll language
    }
  }
}

export {};
