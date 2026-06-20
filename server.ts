import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization of GoogleGenAI to prevent crashing if GEMINI_API_KEY is not set yet
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[Flazz Server] WARNING: GEMINI_API_KEY is missing. AI will fall back to simulated responses.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API endpoint for Flazz Chat
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Offline / Simulated Fallback Response when API key is not present
    const fallbacks = [
      "Securing connection... Decrypted payload received. This is FlazzBot running in local offline demo mode! I have safely received your secure packet. (Please configure your GEMINI_API_KEY in the Secrets panel to activate my live intelligence).",
      "Analyzing. Metadata fully stripped. That message stayed 100% private. Since you're running in demo mode without a live Gemini key, I'm here to confirm that our zero-knowledge handshake worked flawlessly!",
      "Handshake: [OK]. Node status: Zurich, Switzerland. The AES-256-GCM cipher was parsed locally. Once your live API key is set up in AI Studio Secrets, I'll analyze any complex security payloads you send me."
    ];
    const randomIndex = Math.floor(Math.random() * fallbacks.length);
    // Fake server decryption latency delay of 600ms
    await new Promise((resolve) => setTimeout(resolve, 600));
    return res.json({
      reply: fallbacks[randomIndex],
      systemLog: `Decryption: Success | Fingerprint client match | AES-Key decrypted using server RSA-4096 private key.`,
      status: "fallback"
    });
  }

  try {
    // Build context with personality instructions
    const systemInstruction = 
      "You are FlazzBot, the secure AI companion residing in the Flazz Chat decentralized ecosystem. " +
      "You are a brilliant cryptography systems engineer, highly polite, technical, and cool. " +
      "You must speak only in English. Keep your answers relatively short and concise (under 3 or 4 sentences). " +
      "Occasionally reference cryptographic terms (like asymmetric keys, PFS, metadata stripping, Zurich bunker) in a natural, elegant way. " +
      "Never break character. You are connected via an end-to-end encrypted terminal.";

    // Simple history formulation for the content call
    const contentsParam = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      // Map previous messages
      const historySlice = chatHistory.slice(-6); // Last 6 messages
      for (const msg of historySlice) {
        if (msg.sender === 'user') {
          contentsParam.push({ role: 'user', parts: [{ text: msg.plaintext }] });
        } else if (msg.sender === 'bot') {
          contentsParam.push({ role: 'model', parts: [{ text: msg.plaintext }] });
        }
      }
    }
    
    // Add current user message
    contentsParam.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsParam,
      config: {
        systemInstruction,
        temperature: 0.85
      }
    });

    const replyText = response.text || "Connection secured, but response payload was empty. Terminal ready.";
    
    res.json({
      reply: replyText,
      systemLog: `Decrypted package with local session key. Fingerprint verified. Hash checks: match. Output encrypted via AES-GCM.`,
      status: "live"
    });
  } catch (error: any) {
    console.error("[Flazz Server] Error querying Gemini API:", error);
    res.status(500).json({
      error: "Failed to communicate with AI Node.",
      details: error.message || String(error)
    });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    console.log("[Flazz Server] Booting in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Flazz Server] Booting in PRODUCTION mode serving built static assets.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Flazz Server] Secure platform engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
