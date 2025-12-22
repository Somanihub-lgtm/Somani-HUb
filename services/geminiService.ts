
import { GoogleGenAI, Type } from "@google/genai";

// Use gemini-3-flash-preview for text enhancement tasks as per guidelines
export const generateTextEnhancement = async (currentText: string, instruction: string): Promise<string> => {
  // Always initialize with direct process.env.API_KEY access
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Original text: "${currentText}". \nInstruction: ${instruction}. \nProvide only the rewritten text without quotes or explanations.`,
    });
    // Access response.text directly as a property, not a method
    return response.text || currentText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
};

// Generate SEO tags using the recommended responseSchema for JSON output
export const generateSeoTags = async (pageContent: string): Promise<{title: string, description: string}> => {
  // Always initialize with direct process.env.API_KEY access
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this website content summary: "${pageContent.substring(0, 500)}...", generate a SEO Meta Title (max 60 chars) and Meta Description (max 160 chars). Return JSON format only: { "title": "...", "description": "..." }`,
      config: { 
        responseMimeType: "application/json",
        // Using responseSchema as recommended for predictable JSON output
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'The SEO Meta Title (max 60 characters).',
            },
            description: {
              type: Type.STRING,
              description: 'The SEO Meta Description (max 160 characters).',
            },
          },
          required: ['title', 'description'],
        }
      }
    });
    
    // Access response.text property and trim for parsing
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr || '{"title": "", "description": ""}');
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    return { title: "", description: "" };
  }
};
