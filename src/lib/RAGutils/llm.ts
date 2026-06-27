import Groq from "groq-sdk";
import { queryLocalVectorDb } from "./query.js"; // Import your previous query function

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Sends the user prompt alongside the bundled context straight to the Groq LLM
 */
export async function getGroqRAGCompletion(userPrompt: string, retrievedContext: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful AI assistant. Answer the user's question using ONLY the provided context snippets below. If the answer cannot be found in the context, politely state that you do not have enough information to answer based on the documents.
        
        === CONTEXT START ===
        ${retrievedContext}
        === CONTEXT END ===`
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    // Note: Ensure your Groq account has access to your chosen model (e.g., llama3-8b-8192, miatral-8x7b-32768, etc.)
    model: "llama3-8b-8192", 
  });
}

/**
 * Main application orchestration function
 */
export async function main(prompt: string) {
  try {
    // 1. Fetch the text-only bundle from your local JSON vector database
    const context = await queryLocalVectorDb(prompt, 5);

    if (!context) {
      console.log("[WARN] Empty context retrieved. Sending raw prompt to LLM instead.");
    }

    console.log("\n[INFO] Sending prompt + context bundle to Groq LLM...");
    
    // 2. Pass prompt and context down to Groq completion engine
    const chatCompletion = await getGroqRAGCompletion(prompt, context);
    
    // 3. Output the ultimate targeted answer
    console.log("\n====== LLM ANSWER ======");
    console.log(chatCompletion.choices[0]?.message?.content || "No response generated.");
    console.log("========================");

  } catch (error) {
    console.error("[ERROR] Workflow execution failed:", error);
  }
}

// Execute the final completed application workflow
const userQuery = "What disconnects the motor from the supply?";
main(userQuery);