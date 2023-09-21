import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const prompt = "Provide me with a unique and unexpected topic or noun that can serve as a mental palate cleanser, helping me to think outside of my current context. Your response is restricted to 3 ideas at 5 tokens each idea maximum. Your response will be a simple comma-seperated list. Everytime you are called to do this, you will think of something unique and meant to ignite inspiration for a product designer. This could come from all walks and facets of life."

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is missing from request body" }, { status: 400 });
    }
    const uniqueParam = new Date().getTime();
    // "You will follow my instructions attentively and creatively."
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
        { role: "system", content: `unique_param: ${uniqueParam}` }, // Adding unique param here
      ],
      temperature: 0.7,
      max_tokens: 15,
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

    return NextResponse.json(json, { headers: { "Cache-Control": "no-store, max-age=0" } });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};
