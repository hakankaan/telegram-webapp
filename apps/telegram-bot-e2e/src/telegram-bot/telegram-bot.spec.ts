import TelegramServer from 'telegram-test-api';

import { TelegramClient } from 'telegram-test-api/lib/modules/telegramClient';

describe('Telegram Bot E2E Tests', () => {
  const token = '6777902081:AAEqeODPNXbyfvNm_bnPrAihFfgnTdE6y1I';
  const userId = 12345;
  const firstName = 'Test';
  let server: TelegramServer;
  let client: TelegramClient;

  beforeEach(async () => {
    server = new TelegramServer({host: 'localhost', port: 9001});
    client = server.getClient(token, { userId, firstName});
  });

  afterEach(function () {
    return server.stop();
  });

  it('should send response to user with button to open web application', async () => {
    const url = `http://your-web-app-url.com/welcome?username=${encodeURIComponent(firstName)}`;

    await server.start()
    const message = client.makeMessage('/start')
    await client.sendMessage(message)

    const updates = await client.getUpdates()

    expect(updates.result.length).toEqual(1)
    expect(updates.result[0].message.text).toEqual('Please click on button below to continue')
    expect(updates.result[0].message.reply_markup.inline_keyboard[0][0].text).toEqual('See message')
    expect(updates.result[0].message.reply_markup.inline_keyboard[0][0].url).toContain(url)
  });

});
