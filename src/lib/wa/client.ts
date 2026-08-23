/**
 * WAHA API client
 * Abstracted behind NotificationChannel interface
 */

interface WaMessage {
  to: string
  text: string
}

export interface NotificationChannel {
  send(to: string, message: string): Promise<boolean>
}

class WahaClient implements NotificationChannel {
  private baseUrl: string
  private apiToken: string

  constructor() {
    this.baseUrl = process.env.WAHA_URL || 'http://localhost:3000'
    this.apiToken = process.env.WAHA_API_TOKEN || ''
  }

  async send(to: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sendText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify({
          chatId: `${to}@c.us`,
          text: message,
        }),
      })
      return response.ok
    } catch {
      return false
    }
  }
}

export function getNotificationChannel(): NotificationChannel {
  return new WahaClient()
}
