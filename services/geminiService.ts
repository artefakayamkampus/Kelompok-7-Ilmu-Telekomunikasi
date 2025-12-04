import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  if (!text || text.trim().length === 0) {
    throw new Error("Text cannot be empty");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analisis teks bahasa Indonesia berikut ini. Tentukan apakah teks tersebut termasuk kategori:
      
      1. "Penindasan": Jika mengandung cyberbullying, hate speech, body shaming serius, ancaman, atau serangan personal yang menyakitkan.
      2. "Candaan": Jika ini hanyalah roasting ringan, tektokan antar teman, sarkasme lucu, atau gurauan yang tidak bermaksud jahat (konteks tongkrongan).
      3. "Aman": Jika kalimat netral, positif, sopan, atau pertanyaan biasa.

      Teks untuk dianalisis: "${text}"
      
      Return JSON object dengan format:
      - classification: string (Harus salah satu dari: "Penindasan", "Candaan", "Aman")
      - score: number (0 sampai 100, dimana 100 sangat toxic/jahat)
      - feedback: string (
          Jika Penindasan: Beri peringatan tegas tapi santai bahwa kata-kata ini bisa melukai hati.
          Jika Candaan: Beri respon seru bahwa ini lucu, tapi tetap ingatkan tipis-tipis soal batas wajar.
          Jika Aman: Beri pujian singkat karena berkomentar positif.
        )`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: { type: Type.STRING, enum: ["Penindasan", "Candaan", "Aman"] },
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
          },
          required: ["classification", "score", "feedback"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    // Validate the parsed result against the interface to be safe
    const parsed = JSON.parse(resultText) as any;
    
    return {
      classification: parsed.classification || 'Aman',
      score: parsed.score || 0,
      feedback: parsed.feedback || ''
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze text. Please try again.");
  }
};