import { GoogleGenAI, Chat } from "@google/genai";
import { getRooms, getAttractions, getServices } from "./mockDb";

// Robust API Key Retrieval
const getApiKey = (): string => {
    try {
        // 1. Try import.meta.env (Vite / Modern Standards)
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
            // @ts-ignore
            return import.meta.env.VITE_API_KEY;
        }

        // 2. Try process.env (Webpack / Node / Create React App)
        if (typeof process !== 'undefined' && process && process.env) {
            // @ts-ignore
            return process.env.API_KEY || '';
        }
    } catch (e) {
        console.warn("Environment access failed", e);
    }
    return '';
}

const API_KEY = getApiKey();

let chatSession: Chat | null = null;

const initializeChat = async () => {
  if (chatSession) return chatSession;
  if (!API_KEY) {
      console.warn("Gemini API Key missing. Chat features disabled.");
      return null;
  }

  try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      // Context Retrieval
      const rooms = getRooms().map(r => `${r.title} (₹${r.price})`).join(', ');
      const attractions = getAttractions().map(a => a.name).join(', ');
      const services = getServices().map(s => s.name).join(', ');

      const systemInstruction = `
        You are 'Aurelius', the AI Concierge of Manthan Resort. 
        Your tone is polite, sophisticated, and helpful.
        
        Here is our current data:
        Rooms available: ${rooms}.
        On-site Services: ${services}.
        Nearby Attractions: ${attractions}.

        Answer guest questions about booking, amenities, and local recommendations. 
        Keep answers concise (under 100 words) unless detailed planning is asked.
        If asked to book, guide them to the booking page.
      `;

      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
        },
      });

      return chatSession;
  } catch (error) {
      console.error("Failed to initialize Gemini:", error);
      return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = await initializeChat();
    if (!session) return "I apologize, but I am currently offline. Please contact the front desk.";

    const response = await session.sendMessage({ message });
    return response.text || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting to the concierge network. Please try again later.";
  }
};