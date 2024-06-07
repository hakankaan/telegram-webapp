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

    
  }
}