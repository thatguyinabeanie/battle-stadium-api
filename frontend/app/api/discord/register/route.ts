import { NextRequest, NextResponse } from 'next/server';

const DISCORD_APP_ID = process.env.DISCORD_APP_ID;
const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN;

if (!DISCORD_APP_ID || !DISCORD_APP_TOKEN) {
  throw new Error('Missing Discord application ID or bot token');
}

const DISCORD_API = 'https://discord.com/api/v10';

export async function POST (_req: NextRequest) {
  try {
    const command = {
      name: 'greet',
      description: 'Responds with a greeting and a random emoji',
      type: 1, // CHAT_INPUT
    };

    const response = await fetch(
      `${DISCORD_API}/applications/${DISCORD_APP_ID}/commands`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${DISCORD_APP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Command registered successfully', data });
  } catch (error) {
    console.error('Error registering command:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
