import { ragchat } from "@/lib/rag-chat";
import { translateText } from "@/lib/translate";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // استلام البيانات من العميل
    const { messages, sessionId } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;

    const response = await ragchat.chat(lastMessage, { streaming: true, sessionId });


    console.log("Original Response:", response);
  
    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}
