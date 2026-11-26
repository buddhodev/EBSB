import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "IITI EBSB Web Portal" });
});

// AI Cultural Guide Endpoint
app.post("/api/ai/ask-cultural-guide", async (req, res) => {
  try {
    const { question, stateContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    const systemInstruction = `You are the official AI Cultural Guide for Ek Bharat Shreshtha Bharat (EBSB) Cell at IIT Indore (IITI).
Your role is to educate, engage, and foster national integration by sharing authentic, respectful, and engaging knowledge about Indian culture, traditions, folk arts, music, dance, architecture, history, and state pairings—especially Madhya Pradesh (home state of IIT Indore) and its paired states like Manipur, Nagaland, and others.

Provide well-formatted, friendly, informative answers using markdown bullet points and headings. Keep tone inspiring, warm, and academic.`;

    const prompt = `Context: ${stateContext || 'General EBSB National Integration & Paired States (MP, Manipur, Nagaland)'}
Question: ${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error in ask-cultural-guide:", error);
    res.status(500).json({ error: error.message || "Failed to process cultural query." });
  }
});

// Dynamic Cultural Quiz Generator Endpoint
app.post("/api/ai/generate-quiz", async (req, res) => {
  try {
    const { topic = "General Indian Culture & State Pairings", difficulty = "Medium" } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate a 5-question multiple-choice trivia quiz about EBSB, Indian culture, festivals, food, languages, and heritage (especially focusing on Madhya Pradesh, Manipur, Nagaland, and general Indian cultural diversity).
Topic: ${topic}
Difficulty: ${difficulty}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  funFact: { type: Type.STRING },
                },
                required: ["id", "question", "options", "correctIndex", "explanation"],
              },
            },
          },
          required: ["quizTitle", "questions"],
        },
      },
    });

    const quizData = JSON.parse(response.text || "{}");
    res.json(quizData);
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: error.message || "Failed to generate dynamic quiz." });
  }
});

// Bhasha Sangam Translation & Pronunciation Endpoint
app.post("/api/ai/translate-phrase", async (req, res) => {
  try {
    const { phrase } = req.body;
    if (!phrase) {
      return res.status(400).json({ error: "Phrase is required." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Translate the English phrase/greeting "${phrase}" into multiple prominent Indian languages for the Bhasha Sangam EBSB initiative.
Include Hindi (Devanagari), Manipuri/Meiteilon (Bengali script or Meitei Mayek transliteration), Nagamese / Ao, Marathi, Tamil, Bengali, and Malvi (MP regional dialect).
For each language, provide native script, Latin transliteration, and cultural usage context.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalPhrase: { type: Type.STRING },
            translations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  language: { type: Type.STRING },
                  region: { type: Type.STRING },
                  nativeText: { type: Type.STRING },
                  transliteration: { type: Type.STRING },
                  culturalNote: { type: Type.STRING },
                },
                required: ["language", "nativeText", "transliteration"],
              },
            },
          },
          required: ["originalPhrase", "translations"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error translating phrase:", error);
    res.status(500).json({ error: error.message || "Failed to translate phrase." });
  }
});

// Vite Middleware & Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
