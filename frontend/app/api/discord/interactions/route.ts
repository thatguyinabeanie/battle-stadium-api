import { NextRequest, NextResponse } from "next/server";
import { InteractionType, InteractionResponseType, verifyKey } from "discord-interactions";
import { auth } from "@clerk/nextjs/server";
import { getMe } from "@/app/data/actions";

const DISCORD_API = "https://discord.com/api/v10";

const DISCORD_APP_ID = process.env.DISCORD_APP_ID;
const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN;
const DISCORD_APP_PUBLIC_KEY = process.env.DISCORD_APP_PUBLIC_KEY;

if (!DISCORD_APP_ID || !DISCORD_APP_TOKEN) {
  throw new Error("Missing Discord application ID or bot token");
}

if (!DISCORD_APP_PUBLIC_KEY) {
  throw new Error("DISCORD_APP_PUBLIC_KEY is not set");
}

// Array of emojis to choose from
const EMOJIS = ["😊", "👋", "🎉", "✨", "🌟", "🚀", "🌈", "🦄", "🍕", "🎈"];

// Function to get a random emoji
function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");

  if (!signature || !timestamp) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const rawBody = await req.text();

  const isValidRequest = await verifyKey(rawBody, signature, timestamp, DISCORD_APP_PUBLIC_KEY as string);

  if (!isValidRequest) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const interaction = JSON.parse(rawBody);

  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      case "greet":
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Hello World ${getRandomEmoji()}`,
          },
        });
      default:
        return new NextResponse("Unknown command", { status: 400 });
    }
  }

  return new NextResponse("Unhandled interaction type", { status: 400 });
}

// Register commands with Discord
export async function PUT (_req: NextRequest) {
  const clerkAuth = auth();

  if (!clerkAuth.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const me = (await getMe()).data;

  if (!me || !me.admin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const command = {
      name: "greet",
      description: "Responds with a greeting and a random emoji",
      type: 1, // CHAT_INPUT
    };

    const response = await fetch(`${DISCORD_API}/applications/${DISCORD_APP_ID}/commands`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${DISCORD_APP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      const error = await response.text();

      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ message: "Command registered successfully", data });
  } catch (error) {
    console.error("Error registering command:", error); // eslint-disable-line no-console

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
