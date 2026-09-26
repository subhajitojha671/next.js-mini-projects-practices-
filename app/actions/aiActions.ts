


"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function generateTextAction(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", // Safe, standard model name
      contents: prompt,
    });

    return response.text || "No output generated";
  } catch (error: any) {
    // This will print the actual Google API error in your terminal/console
    console.error("Detailed AI Error:", error);
    
    // Throw the real error message so you can see it in the UI/console
    throw new Error(error?.message || "Failed to generate text.");
  }
}