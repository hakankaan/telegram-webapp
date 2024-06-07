import { TelegramClient } from "../../infrastructure/telegram";
import { UserService } from "../interfaces";

export class TelegramService {
  constructor(private telegramClient: TelegramClient, private userService: UserService) {}

  initializeHandlers() {
    this.telegramClient.onText(/\/start/, async (msg) => {
      try {
        const chatId = msg.chat.id;
        const firstName = msg.from?.first_name || '';
  
        await this.userService.registerUser(chatId.toString(), firstName);

        const url = `http://your-web-app-url.com/welcome?username=${encodeURIComponent(firstName)}`;
        this.telegramClient.sendMessage(chatId, "Please click on button below to continue", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'See message',
                  url,
                },
              ],
            ]
          }
        });
      } catch (error) {
        console.error(error);
      }
    });

    this.telegramClient.onText(/\/adminhello (\d+) (.+)/, async (msg, match) => {
      try {
        const chatId = msg.chat.id;
        const adminIds = ['5625744975', 'ADMIN_TELEGRAM_ID_2'];
  
        if (!adminIds.includes(chatId.toString())) {
          this.telegramClient.sendMessage(chatId, 'Unauthorized');
          return;
        }
  
        const userId = match?.[1];
        const message = match?.[2];
  
        if (userId && message) {
          this.telegramClient.sendMessage(parseInt(userId), message);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
}