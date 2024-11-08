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

    // إرسال آخر رسالة إلى RAG-Chat API
    const response = await ragchat.chat(lastMessage, { streaming: true, sessionId });

    // إذا كنت بحاجة إلى ترجمة النص إلى اللغة العربية
    const translation = await translateText(lastMessage, "ar");

    console.log("Original Response:", response);
    console.log("Translated Message:", translation);

    // الرد باستخدام AI chat adapter
    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}
