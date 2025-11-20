import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real app, we handle missing keys gracefully. 
// For this demo, we instantiate if key exists or handle errors at call time.

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStudyPlan = async (topic: string, hoursAvailable: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a detailed ${hoursAvailable}-hour study plan for the solar topic: "${topic}". 
      Focus on NABCEP PV Associate exam preparation. 
      Break it down into 1-hour blocks with specific learning objectives and a quick quiz question for each block.`,
    });
    return response.text || "No plan generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate study plan. Please try again.";
  }
};

export const askSolarCoach = async (question: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Solar Energy Master Trainer helping a student (Michael) prepare for the NABCEP PV Associate exam.
      
      Student Question: "${question}"
      
      Provide a clear, concise explanation suitable for a solar professional. If calculation is needed, show steps. End with a motivating tip.`,
    });
    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Solar Coach is currently offline (API Error).";
  }
};
