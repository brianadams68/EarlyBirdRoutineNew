
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { time, muscles } = req.query;
  
  if (!time || !muscles) {
    return res.status(400).json({ error: 'Missing required query parameters: time and muscles' });
  }

  try {
    const muscleArray = Array.isArray(muscles) ? muscles : [muscles];
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Generate a gym routine for ${time} minutes focusing on ${muscleArray.join(", ")}` }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch routines from GEMINI API: ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
}