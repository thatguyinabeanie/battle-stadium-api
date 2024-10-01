import { NextRequest, NextResponse } from 'next/server';
import {
  InteractionType,
  InteractionResponseType,
  verifyKey,
} from 'discord-interactions';

const getDiscordPublicKey = () => {
  const publicKey = process.env.DISCORD_APP_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error('DISCORD_APP_PUBLIC_KEY is not set');
  }
  return publicKey as string;
}
// You should store this in an environment variable
const DISCORD_APP_PUBLIC_KEY: string = getDiscordPublicKey();

// Array of emojis to choose from
const EMOJIS = ['😊', '👋', '🎉', '✨', '🌟', '🚀', '🌈', '🦄', '🍕', '🎈'];

// Function to get a random emoji
function getRandomEmoji () {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export async function POST (req: NextRequest) {
  const signature = req.headers.get('x-signature-ed25519');
  const timestamp = req.headers.get('x-signature-timestamp');

  if (!signature || !timestamp) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const rawBody = await req.text();

  const isValidRequest = await verifyKey(
    rawBody,
    signature,
    timestamp,
    DISCORD_APP_PUBLIC_KEY
  );

  if (!isValidRequest) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const interaction = JSON.parse(rawBody);

  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      case 'greet':
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Hello World ${getRandomEmoji()}`,
          },
        });
      default:
        return new NextResponse('Unknown command', { status: 400 });
    }
  }

  return new NextResponse('Unhandled interaction type', { status: 400 });
}
