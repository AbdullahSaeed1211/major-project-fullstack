import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "@/lib/mongodb";
import { withAuth, createErrorResponse } from "@/lib/auth";
import mongoose from "mongoose";

// Add type declaration for global ChatHistory
declare global {
  // eslint-disable-next-line no-var
  var ChatHistory: typeof mongoose.Model;
}

// Define chat message interface
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Function to generate the prompt based on the provided context and question
function generatePrompt(context: string, query: string): string {
  return `You are a brain health expert providing educational information about neurological health. Please provide helpful information about brain health, but remember you are not giving medical advice.

Instructions:
1. Keep your responses concise and to the point (3-5 sentences for general questions)
2. Use simple, clear language without jargon
3. Break information into short paragraphs when needed
4. Avoid long-winded explanations
5. Prioritize actionable information
6. Focus only on the most relevant information to the user's question

Previous conversation:
${context}

User's new question: ${query}

Please respond in a helpful, educational way without providing specific medical advice. Focus on brain health facts, research, and general guidance.`;
}

export const POST = withAuth(async (req: NextRequest, userId: string) => {
  try {
    const reqBody = await req.json();
    const { history, message } = reqBody;

    if (!Array.isArray(history) || typeof message !== 'string') {
      return createErrorResponse("Invalid input data", 400);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return createErrorResponse("API configuration error", 500);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a brain health assistant providing educational information about neurological health. Keep responses concise and focused.",
    });

    const context = history.map((msg: ChatMessage) => `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`).join('\n');
    const prompt = generatePrompt(context, message);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    // Save chat history
    try {
      await db.connect();
      
      // Check if ChatHistory model exists, if not create it
      const ChatHistorySchema = new mongoose.Schema({
        userId: String,
        message: String,
        response: String,
        timestamp: Date
      });
      
      const ChatHistory = mongoose.models.ChatHistory || 
        mongoose.model('ChatHistory', ChatHistorySchema);
      
      await ChatHistory.create({
        userId,
        message,
        response: text,
        timestamp: new Date()
      });
    } catch (dbError) {
      console.error("Error saving chat history:", dbError);
      // Continue even if saving history fails
    }

    return NextResponse.json({
      status: "success",
      response: text,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return createErrorResponse("Failed to generate response", 500);
  }
}); 