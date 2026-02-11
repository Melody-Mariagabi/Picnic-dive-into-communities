
import { GoogleGenAI, Type } from "@google/genai";
import { PriceData, UsageData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEnergyInsights = async (prices: PriceData[], usage: UsageData[]) => {
  const prompt = `
    Analyze this energy data for a household and provide actionable insights.
    Prices: ${JSON.stringify(prices.slice(0, 10))}
    Recent Usage: ${JSON.stringify(usage.slice(-5))}
    
    Rules:
    - Identify the best window for high-energy tasks (e.g. laundry, EV charging).
    - Warn if a price spike is coming.
    - Provide 3 clear recommendations.
    - Be concise and friendly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            bestWindow: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            savingsEstimate: { type: Type.STRING }
          },
          required: ["summary", "bestWindow", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};
