import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import ChatHistory from "@/lib/models/ChatHistory";
import mongoose from "mongoose";

// Add type declaration for global ChatHistory
declare global {
  // eslint-disable-next-line no-var
  var ChatHistory: typeof mongoose.Model;
}

// Define chat message interface
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Function to generate the prompt based on the provided context and question
const generatePrompt = (context: string, question: string) => {
  const instructions = `
    You are an expert in neurology and brain health. Provide accurate, evidence-based information about brain conditions, 
    cognitive health, and neurological disorders. Your responses should be informative, supportive, and educational.
    
    Important guidelines:
    - Provide factual, medically accurate information about brain health
    - Explain complex neurological concepts in simple, understandable terms
    - Do not diagnose specific conditions or provide personalized medical advice
    - Recommend consulting healthcare professionals for specific medical concerns
    - Cite general medical consensus where appropriate
    - Focus on educational content about brain health, prevention, and general information
    - Provide emotional support and encouragement for brain health concerns
    - Suggest general lifestyle factors that support brain health (exercise, diet, sleep, etc.)
    
    If you don't know the answer, simply state "I don't know."
    If the question is outside the scope of brain health, politely redirect to brain-related topics.
    If asked about emergency situations, advise seeking immediate medical attention.
  `;

  const contextSection = `Previous conversation:\n${context}\n\n`;
  const questionSection = `User question: ${question}\n`;

  return `${instructions}${contextSection}${questionSection}Response:`;
};

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
      systemInstruction: "You are a brain health assistant providing educational information about neurological health.",
    });

    const context = history.map((msg: ChatMessage) => `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`).join('\n');
    const prompt = generatePrompt(context, message);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    // Save chat history
    try {
      await connectToDatabase();
      
      // Check if ChatHistory model exists, if not create it
      if (typeof ChatHistory === 'undefined') {
        const ChatHistorySchema = new mongoose.Schema({
          userId: String,
          message: String,
          response: String,
          timestamp: Date
        });
        
        global.ChatHistory = mongoose.models.ChatHistory || 
          mongoose.model('ChatHistory', ChatHistorySchema);
      }
      
      await global.ChatHistory.create({
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
    console.error('Error generating content:', error);

    let errorMessage = "Failed to generate response";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return createErrorResponse(errorMessage, 500);
  }
}); 