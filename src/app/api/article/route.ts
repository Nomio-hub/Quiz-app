import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, content } = body;

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: `Please provide a concise summary of the following article: ${content}`,
  });
  console.log(interaction.output_text);

  return NextResponse.json({
    message: "Amjilttai summerize hiilee",
    summery: interaction.output_text,
  });
};
