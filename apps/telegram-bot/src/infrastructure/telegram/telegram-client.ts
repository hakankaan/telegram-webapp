import TelegramBot from 'node-telegram-bot-api';

export class TelegramClient {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true, baseApiUrl: process.env.TELEGRAM_API_URL });
  }

  onText(regex: RegExp, callback: (msg: TelegramBot.Message, match: RegExpExecArray | null) => void) {
    this.bot.onText(regex, callback);
  }

  sendMessage(chatId: number | string, text: string, options?: TelegramBot.SendMessageOptions) {
    this.bot.sendMessage(chatId, text, options);
  }

}