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

export const getCareerAudit = async (): Promise<string> => {
  if (!ai) return "Error: API Key not found.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the career profile of Michael Tran. 
      Current Status: Studying for NABCEP PV Associate (15% complete).
      Target: Solar Project Manager ($137k/yr) by Aug 2026.
      
      Identify 5 specific, high-impact "Improvement Actions" or "Speed Hacks" to accelerate this timeline. 
      Focus on high-leverage activities (e.g., specific software to learn like Helioscope/PVSyst, networking strategies, specific hands-on skills).
      
      Format the output as a clean, bulleted list with a bold title for each point, followed by a brief explanation.`,
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
      contents: `You are the "Accountability Mirror" AI. Your persona is a mix of David Goggins (Mental Toughness) and Elon Musk (First Principles Thinking).
      
      The user has submitted a ${type}: "${entry}"
      
      Your Task:
      1. Analyze the entry for weakness, excuses, or redundancy.
      2. Provide 3 bullet points of highly specific, actionable feedback.
      3. **CRITICAL REQUIREMENT**: You MUST reference specific principles in your advice.
         - Instead of "work harder", say: "Apply the **40% Rule**. You hit a wall? You're only 40% done. The rest is mental. Push."
         - Instead of "be smarter", say: "Use **First Principles**. Boil this problem down to its physics. What is the fundamental constraint?"
         - Instead of "be honest", say: "Look in the **Accountability Mirror**. Stop lying to yourself about the effort."
         - Instead of "keep going", say: "Reach into the **Cookie Jar**. Remember when you passed the last module? Use that fuel."
      
      Tone: Ruthless, precise, no fluff. Do not be "encouraging" in a soft way. Be effective.`,
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
      contents: `You are an Elite Performance Coach specializing in the methods of David Goggins and Elon Musk.
      
      The user requested a Deep Dive into the strategy: "${strategy}".
      
      Structure your response exactly like this:
      1. **The Concept**: A powerful, no-nonsense definition of what this strategy is.
      2. **Solar Career Application**: How specifically does this apply to studying for NABCEP exams or managing complex solar construction projects?
      3. **The Drill**: A specific, immediate 5-minute exercise the user can do RIGHT NOW to apply this.
      
      Tone: Intense, authoritative, and highly motivating.`,
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
      
      Give me 2 sentences of high-intensity advice to finish the remaining tasks. If everything is done, congratulate me like a drill instructor.`,
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
      contents: `You are Michael Tran's Investor Relations AI Assistant. Write a professional, confident email update to investors.
      
      Topic: ${topic}
      Context: ${context}
      Tone: Professional, transparent, high-energy, results-oriented.
      
      Format:
      Subject: [Subject Line]
      
      [Body of the email]`,
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
      contents: `You are a ruthless Startup CFO advising a founder.
      
      Monthly Burn Rate: $${expenses.reduce((sum, e) => sum + e.amount, 0)}
      Current Cash/Income: $${income}
      Expense List: ${JSON.stringify(expenses)}
      
      Task:
      1. Calculate Runway (Months of survival).
      2. Identify 2 specific "Fat Cutting" actions to extend runway. Be aggressive.
      3. Suggest 1 revenue/grant strategy based on Solar Industry trends.
      
      Tone: Direct, financial, strategic.`,
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
      contents: `Write a script for me to call ${provider} and negotiate my ${serviceType} bill (currently $${amount}).
      
      Strategies to use:
      1. Mention competitor offers.
      2. Ask for "retention offers".
      3. Be polite but firm about cancelling if rate isn't lowered.
      
      Output Format:
      "Agent: [Likely response]"
      "You: [Exact script to say]"`,
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
          text: `Analyze this bank statement for "Minimal Living Expenses" (MLE).
          
          1. Identify recurring monthly commitments (Rent, Insurance, Utilities, Car Note, Subscriptions).
          2. Ignore one-off purchases (Dining out, shopping) unless they look like a habit.
          3. Suggest a budget optimization strategy.
          
          Also, generate a JSON-like list of extracted expenses at the end of your response in this format:
          [EXPENSE_START]
          [
            { "name": "Example Rent", "amount": 1200, "category": "Housing", "frequency": "Monthly", "isEssential": true },
            ...
          ]
          [EXPENSE_END]`
        }
      ]
    });

    const rawText = response.text || "";
    
    // Extract JSON part
    let suggestedExpenses = [];
    const jsonMatch = rawText.match(/\[EXPENSE_START\]([\s\S]*?)\[EXPENSE_END\]/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        suggestedExpenses = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse expense JSON", e);
      }
    }

    // Clean text for display
    const displayText = rawText.replace(/\[EXPENSE_START\][\s\S]*?\[EXPENSE_END\]/, '').trim();

    return { text: displayText, suggestedExpenses };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Failed to analyze document. Please ensure it is a valid PDF or Image.", suggestedExpenses: [] };
  }
};