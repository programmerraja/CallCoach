import { AssemblyAI } from 'assemblyai'
import { PROMPT, METRICS_PROMPT, SUMMARY_PROMPT } from './prompt'

export async function uploadAudio(file: File) {
  
  const settings = JSON.parse(localStorage.getItem("callAnalysisSettings") || "{}");
  if (!settings.assemblyAIKey) {
    throw new Error("Assembly AI key not configured");
  }

  const formData = new FormData();
  formData.append('audio', file);
  const client = new AssemblyAI({
    apiKey: settings.assemblyAIKey
  })
  const response = await client.files.upload(formData)
  return response;
}

export async function transcribeAudio(audioUrl: string) {
  const settings = JSON.parse(localStorage.getItem("callAnalysisSettings") || "{}");
  if (!settings.assemblyAIKey) {
    throw new Error("Assembly AI key not configured");
  }

  // Start transcription
  const client = new AssemblyAI({
    apiKey: settings.assemblyAIKey
  })
  const response = await client.transcripts.transcribe({
    audio_url: audioUrl,
  });

  const { id } = response;

  while (true) {
    const pollResponse = await client.transcripts.get(id);
    
    if (pollResponse.status === 'completed') {
      return pollResponse.text;
    }
    
    if (pollResponse.status === 'error') {
      throw new Error('Transcription failed');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export async function analyzeTranscript(transcript: string, settings: any) {
  if (settings.modelProvider === 'openai') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: settings.modelName,
        messages: [{
          role: 'user',
          content: `${METRICS_PROMPT}
            Transcript: ${transcript}`
        }]
      })
    });

    const data = await response.json();
    // Parse the response and extract structured data
    return {
      duration: "15 minutes", // Parse from response
      speakers: ["Sales Rep", "Customer"],
      sentiment: "Positive",
      keywords: ["pricing", "features", "follow-up"],
      clarity: "Good",
    };
  } else if (settings.modelProvider === 'ollama') {
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: settings.modelName,
        prompt: `${METRICS_PROMPT}
            Transcript: ${transcript}`,
      }),
    });

    const data = await response.json();
    // Parse the response and return structured data
    return {
      duration: "15 minutes",
      speakers: ["Sales Rep", "Customer"],
      sentiment: "Positive",
      keywords: ["pricing", "features", "follow-up"],
      clarity: "Good",
    };
  }

  throw new Error('Invalid model provider');
} 

export async function summarizeTranscript(transcript: string, settings: any) {
  if (settings.modelProvider === 'openai') {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        prompt: `${SUMMARY_PROMPT}
            Transcript: ${transcript}`,
        max_tokens: 150,
        temperature: 0.7,
      })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  } else if (settings.modelProvider === 'ollama') {
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: settings.modelName,
        prompt: `${SUMMARY_PROMPT}
            Transcript: ${transcript}`,
      }),
    });

    const data = await response.json();
    return data.summary;
  }

  throw new Error('Invalid model provider');
}   




// async function run() {
//     const SAMPLE_RATE = 16000;
//     const client = new AssemblyAI({
//     apiKey: 'YOUR_API_KEY'
//   });

//   const transcriber = client.realtime.transcriber({
//     sampleRate: SAMPLE_RATE
//   });

//   transcriber.on('open', ({ sessionId }) => {
//     console.log(`Session opened with ID: ${sessionId}`);
//   });

//   transcriber.on('error', (error) => {
//     console.error('Error:', error);
//   });

//   transcriber.on('close', (code, reason) => {
//     console.log('Session closed:', code, reason);
//   });

//   transcriber.on('transcript', (transcript) => {
//     if (!transcript.text) return;

//     if (transcript.message_type === 'PartialTranscript') {
//       console.log('Partial:', transcript.text);
//     } else {
//       console.log('Final:', transcript.text);
//     }
//   });

//   console.log('Connecting to real-time transcript service');
//   await transcriber.connect();

//   console.log('Starting recording');
//   // @ts-ignore
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   const source = audioContext.createMediaStreamSource(stream);

//   const processor = audioContext.createScriptProcessor(4096, 1, 1);
//   processor.onaudioprocess = (event) => {
//     const inputData = event.inputBuffer.getChannelData(0);
//     const int16Data = new Int16Array(inputData.length);
//     for (let i = 0; i < inputData.length; i++) {
//       int16Data[i] = Math.min(1, inputData[i]) * 32767;
//     }
//     transcriber.send(int16Data);
//   };

//   source.connect(processor);

//   processor.connect(audioContext.destination);

//   // Stop recording and close connection using a button click.
//   const stopButton = document.createElement('button');

//   stopButton.textContent = 'Stop Recording';
  
//   document.body.appendChild(stopButton);

//   stopButton.addEventListener('click', async () => {
//     console.log('Stopping recording');
//     stream.getTracks().forEach((track) => track.stop());
//     processor.disconnect();
//     source.disconnect();
//     audioContext.close();

//     console.log('Closing real-time transcript connection');
//     await transcriber.close();

//     stopButton.remove();
//   });
// }

// run().catch(console.error);

