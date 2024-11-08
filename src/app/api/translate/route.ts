import { NextResponse } from 'next/server';
import { translateText } from '@/lib/translate';

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json();

    const translation = await translateText(text, targetLanguage);
    return NextResponse.json({ translation });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
