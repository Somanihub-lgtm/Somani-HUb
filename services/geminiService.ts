import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTextEnhancement = async (currentText: string, instruction: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key missing. Please configure environment.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Original text: "${currentText}". \nInstruction: ${instruction}. \nProvide only the rewritten text without quotes or explanations.`,
    });
    return response.text || currentText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const generateSeoTags = async (pageContent: string): Promise<{title: string, description: string}> => {
  const ai = getClient();
  if (!ai) return { title: "Error", description: "API Key Missing" };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on this website content summary: "${pageContent.substring(0, 500)}...", generate a SEO Meta Title (max 60 chars) and Meta Description (max 160 chars). Return JSON format only: { "title": "...", "description": "..." }`,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    return { title: "", description: "" };
  }
};