import { updateTasks } from "@/lib/database/update-data";
import { getTelegramUsername } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { task, telegramId } = await request.json();
    const botToken = process.env.NEXT_PUBLIC_BOT_ID;
    const channelUsername = getTelegramUsername(task.link);

    if (!channelUsername || !botToken || !telegramId) {
      throw new Error(
        "Channel Username, Bot token, or Telegram id is required"
      );
    }

    let formattedChatId = channelUsername;
    if (
      !channelUsername.startsWith("@") &&
      !channelUsername.startsWith("-100")
    ) {
      formattedChatId = "@" + channelUsername;
    }

    const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${encodeURIComponent(
      formattedChatId
    )}&user_id=${telegramId}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram API error`);
    }

    // Now add the id to the user list of completed tasks
    const result = await updateTasks(telegramId, task.id);

    if (!result) {
      throw new Error(`Unable to add task to user`);
    }

    const status = data.result.status;
    const isMember = ["creator", "administrator", "member"].includes(status);
    return NextResponse.json({ isMember, error: false });
  } catch (error) {
    console.log("Error in verifying user", error);
    return NextResponse.json({ isMember: false, error: true });
  }
}
