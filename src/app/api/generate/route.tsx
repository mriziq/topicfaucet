import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log(req.body)
    // const { prompt } = req.body;
    const prompt = "Provide me with a random creative writing prompt. Your response is restricted to 3 and returned as a simple string where each prompt is separated by a semicolon. Your response should not be an ordered or underdered list, but rather a simple semi-colon separated string "

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is missing from request body" }, { status: 400 });
    }
    const uniqueParam = new Date().getTime();
    // "You will follow my instructions attentively and creatively."
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful, creative and hollistic Product Design assistant who has a background in philosophy, science, and archiecture." },
        { role: "user", content: prompt },
        { role: "system", content: `unique_param: ${uniqueParam}` }, // Adding unique param here
      ],
      temperature: 0.9,
      max_tokens: 30,
    };


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
        
    const json = await response.json();

    return NextResponse.json(json);

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};
