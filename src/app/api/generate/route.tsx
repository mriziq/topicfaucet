import { NextRequest, NextResponse } from 'next/server';

interface Payload {
  model: string;
  messages: { role: string; content: string }[];
  temperature: number;
  max_tokens: number;
}

interface OpenAIApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }
  ];
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const prompt: string = "Provide me with a unique and unexpected topic or noun that can serve as a mental palate cleanser, helping me to think outside of my current context. Your response is restricted to 3 ideas at each eith a total token size equal to or less than your maximum of 30. Your response will be a simple comma-seperated list."

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is missing from request body' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const payload: Payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a vastly hollistic, creative, helpful digital product design assistant with a background in philsophy and architecture.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 30,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const json: OpenAIApiResponse = await response.json();

    return NextResponse.json(json);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
};
