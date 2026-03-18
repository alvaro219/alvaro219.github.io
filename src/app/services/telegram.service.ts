import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TelegramService {
  private readonly botToken = environment.telegramBotToken;
  private readonly chatId = environment.telegramChatId;

  async send(text: string): Promise<boolean> {
    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: 'Markdown',
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
