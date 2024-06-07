import TelegramBot from 'node-telegram-bot-api';

export class TelegramClient {
  private bot: TelegramBot;

  constructor(token: string) {
    // @ts-expect-error testEnvironment is valid option but not in the types yet
    this.bot = new TelegramBot(token, { polling: true, testEnvironment: false});
  }

  onText(regex: RegExp, callback: (msg: TelegramBot.Message, match: RegExpExecArray | null) => void) {
    this.bot.onText(regex, callback);
  }

  sendMessage(chatId: number | string, text: string, options?: TelegramBot.SendMessageOptions) {
    this.bot.sendMessage(chatId, text, options);
  }
}