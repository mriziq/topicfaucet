import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log(req.body)
    // const { prompt } = req.body;
    const prompt = "Provide me with a random full clause (noun, verb, adjective, adverb) that can serve as a mental palate cleanser, helping me to think outside of my current context. Whether you give me a topic or full clause as specifcied before is up to you, be unique. Your response is restricted to 3 ideas at each eith a total token size equal to or less than your maximum of 30. Your response will be a simple comma-seperated list."

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

    return NextResponse.json(json, { headers: { "Cache-Control": "no-store, max-age=0" } });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};
