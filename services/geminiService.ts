
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
      contents: `You are an expert Life & Career Strategy Coach.
      
      User Question: "${question}"
      
      Provide a clear, concise explanation. If it's a technical question, provide steps. If it's life advice, use First Principles.`,
    });
    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Coach is currently offline (API Error).";
  }
};

export const researchCareerTopic = async (topic: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Research the career/skill topic: "${topic}".
      
      Return a structured JSON response (DO NOT return markdown code blocks, just the raw JSON string) with:
      {
        "topic": "${topic}",
        "summary": "Brief overview (2 sentences)",
        "prerequisites": ["item 1", "item 2"],
        "estimatedCost": "$X - $Y",
        "timeline": "X months",
        "resources": [ { "title": "Resource Name", "url": "https://..." } ]
      }`,
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "{}";
  }
};

export const generateWeeklyRecap = async (journalEntries: string[], tasksCompleted: number, totalTasks: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Senior Performance Coach. Analyze my week.
      
      Data:
      - Tasks Completed: ${tasksCompleted}/${totalTasks}
      - Journal Excerpts: ${JSON.stringify(journalEntries)}
      
      Output a JSON string (no markdown) with:
      {
        "keyWins": ["Win 1", "Win 2"],
        "lessonsLearned": ["Lesson 1", "Lesson 2"],
        "aiStrategyForNextWeek": "A paragraph of specific strategic advice for the upcoming week.",
        "score": 85 (Calculate a score 0-100 based on the data)
      }`,
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "{}";
  }
};

export const draftDailyPlan = async (priorities: string[], backlog: string[]): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a schedule for tomorrow.
      
      Priorities: ${priorities.join(', ')}
      Backlog Tasks: ${backlog.join(', ')}
      
      Output a simple text schedule (e.g., "08:00 AM - Task").`,
    });
    return response.text || "Planning failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Planning Offline.";
  }
};

export const getCareerAudit = async (): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the career profile. 
      Current Status: Studying for NABCEP PV Associate.
      Target: Project Manager.
      
      Identify 5 specific, high-impact "Improvement Actions" or "Speed Hacks" to accelerate this timeline. 
      
      Format the output as a clean, bulleted list with a bold title for each point.`,
    });
    return response.text || "No audit generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Career Audit system is currently offline (API Error).";
  }
};

export const analyzeReflection = async (entry: string, type: 'Morning Plan' | 'Evening Review'): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the "Accountability Mirror" AI.
      
      The user has submitted a ${type}: "${entry}"
      
      Your Task:
      1. Analyze the entry for weakness, excuses, or redundancy.
      2. Provide 3 bullet points of highly specific, actionable feedback.
      3. Reference principles like the 40% Rule or First Principles.
      
      Tone: Ruthless, precise, no fluff.`,
    });
    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Accountability System Offline.";
  }
};

export const getDeepDiveContent = async (strategy: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an Elite Performance Coach.
      
      The user requested a Deep Dive into: "${strategy}".
      
      Structure your response:
      1. **The Concept**: Definition.
      2. **Career Application**: How it applies to professional growth.
      3. **The Drill**: A specific, immediate 5-minute exercise.
      
      Tone: Intense, authoritative.`,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Deep Dive Protocol Offline.";
  }
};

export const getTacticalAdvice = async (phase: string, completed: string[], pending: string[]): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a tactical performance coach.
      Current Phase: ${phase}
      Tasks Completed: ${completed.join(', ')}
      Tasks Remaining: ${pending.join(', ')}
      
      Give me 2 sentences of high-intensity advice.`,
    });
    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tactical Uplink Offline.";
  }
};

export const draftInvestorUpdate = async (topic: string, context: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional, confident email update to stakeholders.
      
      Topic: ${topic}
      Context: ${context}
      Tone: Professional, transparent, high-energy, results-oriented.`,
    });
    return response.text || "No draft generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Drafting System Offline.";
  }
};

// --- FINANCIAL AI SERVICES ---

export const analyzeFinancialHealth = async (expenses: any[], income: number): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Startup CFO.
      
      Monthly Burn: $${expenses.reduce((sum, e) => sum + e.amount, 0)}
      Cash: $${income}
      Expense List: ${JSON.stringify(expenses)}
      
      Task:
      1. Calculate Runway.
      2. Identify 2 "Fat Cutting" actions.
      3. Suggest 1 revenue strategy.
      
      Output valid JSON: { "healthScore": 80, "runwayMonths": 5, "burnDownData": [], "savingsTable": [], "actionPlan": [], "summary": "" }`,
    });
    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CFO System Offline.";
  }
};

export const negotiateBill = async (provider: string, amount: number, serviceType: string): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a negotiation script for ${provider} (${serviceType}, $${amount}).
      Strategies: Competitor offers, retention offers.`,
    });
    return response.text || "Script generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Negotiator Offline.";
  }
};

export const analyzeBankStatement = async (base64Data: string, mimeType: string = 'application/pdf'): Promise<{ text: string, suggestedExpenses: any[] }> => {
  if (!ai) return { text: "Error: API Key not found.", suggestedExpenses: [] };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        },
        {
          text: `Analyze this bank statement for expenses.
          Return JSON list in format: [EXPENSE_START][ ...json... ][EXPENSE_END]`
        }
      ]
    });

    const rawText = response.text || "";
    
    let suggestedExpenses = [];
    const jsonMatch = rawText.match(/\[EXPENSE_START\]([\s\S]*?)\[EXPENSE_END\]/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        suggestedExpenses = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse expense JSON", e);
      }
    }
    const displayText = rawText.replace(/\[EXPENSE_START\][\s\S]*?\[EXPENSE_END\]/, '').trim();

    return { text: displayText, suggestedExpenses };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Failed to analyze document.", suggestedExpenses: [] };
  }
};
