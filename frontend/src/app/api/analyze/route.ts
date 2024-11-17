import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const { transcript, settings } = await request.json();

  if (settings.modelProvider === 'openai') {
    const openai = new OpenAI({ apiKey: settings.apiKey });
    
    const prompt = `Analyze this sales call transcript and provide:
    1. Call duration
    2. Speaker identification
    3. Overall sentiment
    4. Key highlights/topics
    5. Speech clarity assessment

    Transcript: ${transcript}`;

    const completion = await openai.chat.completions.create({
      model: settings.modelName,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse the response and return structured data
    // This is a simplified example - you'd want to parse the response more carefully
    return NextResponse.json({
      duration: "15 minutes",
      speakers: ["Sales Rep", "Customer"],
      sentiment: "Positive",
      keywords: ["pricing", "features", "follow-up"],
      clarity: "Good",
    });
  } else if (settings.modelProvider === 'ollama') {
    // Similar implementation for Ollama
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: 'POST',
      body: JSON.stringify({
        model: settings.modelName,
        prompt: `Analyze this sales call transcript...${transcript}`,
      }),
    });

    const analysis = await response.json();
    // Parse and return structured data
    return NextResponse.json({
      // ... parsed analysis results
    });
  }

  return NextResponse.error();
} 