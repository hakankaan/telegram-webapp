import { TelegramClient } from "../../infrastructure/telegram";
import { UserService } from "../interfaces";

export class TelegramService {
  constructor(private telegramClient: TelegramClient, private userService: UserService) {}

  initializeHandlers() {
    this.telegramClient.onText(/\/start/, async (msg) => {
      try {
        console.log("🚀 ~ TelegramService ~ this.telegramClient.onText ~ msg:", msg)
        
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
        console.log("🚀 ~ TelegramService ~ this.telegramClient.onText ~ chatId", JSON.stringify(msg, null, 2))
        
        if (!adminIds.includes(chatId.toString())) {
          this.telegramClient.sendMessage(chatId, 'Unauthorized');
          return;
        }
        
        console.log("🚀 ~ TelegramService ~ this.telegramClient.onText ~ match:", match)
        const userId = match?.[1];
        const message = match?.[2];

        const hasUserAndMessage = userId && message;
        if (!hasUserAndMessage) {
          throw new Error('Invalid command');
        }

        this.telegramClient.sendMessage(parseInt(userId), message);
        console.log("message sent")
      } catch (error) {
        console.error(error);
      }
    });
  }
}