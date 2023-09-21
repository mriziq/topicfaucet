import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body)
    // const { prompt } = req.body;
    const prompt = "Provide me with a unique and unexpected topic or noun that can serve as a mental palate cleanser, helping me to think outside of my current context. Your response is restricted to 3 ideas at 5 tokens each idea maximum. Your response will be a simple comma-seperated list."

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is missing from request body" }, { status: 400 });
    }

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 15,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
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
