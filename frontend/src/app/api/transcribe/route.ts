import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { audioUrl } = await request.json();

  // Start transcription
  const response = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      'Authorization': process.env.ASSEMBLY_AI_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ audio_url: audioUrl }),
  });

  const { id } = await response.json();

  // Poll for completion
  while (true) {
    const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
      headers: {
        'Authorization': process.env.ASSEMBLY_AI_KEY!,
      },
    });
    const result = await pollResponse.json();
    
    if (result.status === 'completed') {
      return NextResponse.json({ text: result.text });
    }
    
    if (result.status === 'error') {
      return NextResponse.error();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
} 