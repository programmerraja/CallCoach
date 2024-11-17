import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const file = await request.blob();
  
  // Upload to AssemblyAI
  const response = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: {
      'Authorization': process.env.ASSEMBLY_AI_KEY!,
    },
    body: file,
  });

  const { upload_url } = await response.json();
  
  return NextResponse.json({ audioUrl: upload_url });
} 