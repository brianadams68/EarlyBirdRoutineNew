import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { time, muscles } = req.query;

  if (!time || !muscles) {
    return res.status(400).json({ error: "Missing required query parameters: time and muscles" });
  }

  try {
    const muscleArray = Array.isArray(muscles) ? muscles : [muscles];
    
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `Generate a detailed gym routine for ${time} minutes focusing on ${muscleArray.join(", ")}.` },
              { text: "For each exercise, provide its name, a short description, and an appropriate image keyword." }
            ],
          },
        ],
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Failed to fetch routines from GEMINI API: ${errorText}`);
    }

    const rawData = await geminiResponse.json();
    const exercisesText = rawData?.candidates?.[0]?.content?.parts?.[0]?.text || "No exercises found";

    const exercises = exercisesText
      .split("\n")
      .filter(ex => ex.trim() !== "" && !ex.includes("I cannot provide image URLs"))
      .map(exercise => {
        const match = exercise.match(/^(.*?): (.*)$/);
        const name = match ? match[1].trim() : exercise.trim();
        const description = match ? match[2].trim() : "No description available.";

        return {
          name,
          description,
          image: `https://source.unsplash.com/featured/?${name.replace(/\s+/g, "+")}`
        };
      });

    res.status(200).json({ exercises });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
