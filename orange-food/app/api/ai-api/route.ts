// app/api/ai-api/route.ts

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// API anahtarını kontrol et
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Model yapılandırması
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig,
});

// JSON doğrulama fonksiyonu
function isValidJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data || !data.ingredients) {
      return NextResponse.json(
        { error: "Ingredients field is required" },
        { status: 400 }
      );
    }

    const userInput = data.ingredients;

    const message = `
    (Verdiğin çıktı JSON formatında olması gerekli. Sadece şu örnek formata uygun şekilde döndür:) 
    [
      {
        "id": 1,
        "name": "Yemek Adı",
        "image": "/images/yemekadi.jpg",
        "recipe": {
          "ingredients": [
            "malzeme1",
            "malzeme2",
            "malzeme3"
          ],
          "instructions": "Yemeğin yapılış tarifi."
        }
      }
    ]
    Verdiğin tarif ayrıntılı bir instructions bölümüne sahip olsun ve önemli olarak sadece şu malzemeleri içeren yemek tarifi ver başka malzemeler içermesin:
    ${userInput}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user", // Buraya role ekledik
          parts: [{ text: message }],
        },
      ],
    });

    let rawResponse = result?.response?.text().trim();

    // JSON format temizliği
    if (rawResponse?.startsWith("```json")) rawResponse = rawResponse.slice(7);
    if (rawResponse?.endsWith("```")) rawResponse = rawResponse.slice(0, -3);

    // JSON doğrulama kontrolü
    if (!isValidJSON(rawResponse)) {
      return NextResponse.json(
        { error: "Invalid JSON response", details: rawResponse },
        { status: 400 }
      );
    }

    const jsonResponse = JSON.parse(rawResponse);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
