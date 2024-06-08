const STORAGE_PREFIX = 'web-app';

export const localStorage = {
  async setItem(key: string, value: string): Promise<void> {
    await window.localStorage.setItem(`${STORAGE_PREFIX}:${key}`, value);
  },
  async getItem(key: string): Promise<string | null> {
    return window.localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
  },
}