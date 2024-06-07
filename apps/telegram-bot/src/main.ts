import { TelegramClient } from './infrastructure/telegram';
import { UserServiceImpl } from './application/services';
import { TelegramService } from './application/services/telegram.service';
import { UserRepositoryImpl } from './infrastructure/repositories';
import { db } from './infrastructure/db';


async function start() {
  try{
    const token = process.env.TELEGRAM_BOT_TOKEN as string;
    const telegramClient = new TelegramClient(token);

    const userRepository = new UserRepositoryImpl(db);
    const userService = new UserServiceImpl(userRepository);
    const telegramService = new TelegramService(telegramClient, userService);
  
    telegramService.initializeHandlers();
    console.log('Telegram bot is running');
  }catch(e){
    console.error(e);
  }

}

start();

