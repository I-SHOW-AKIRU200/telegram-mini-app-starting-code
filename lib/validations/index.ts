export function getTelegramUsername(url: string): string | null {
  const username = url.split("https://t.me/")[1];
  return username || null; // Return null if no username is found
}
