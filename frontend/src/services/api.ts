import { AssemblyAI } from "assemblyai";
import {
  METRICS_PROMPT,
  SUMMARY_PROMPT,
} from "./prompt";
import { CallMetric } from "../components/pages/homePage";

export interface CallAnalytics {
  summary: string;
  analysis: Partial<AnalysisResults>;
  transcript: string;
  audioUrl: string;
}

export interface AnalysisResults {
  talk_to_listen_ratio: {
    sales_rep: number;
    customer: number;
  };
  objection_count: number;
  competitor_mentions: { [key: string]: number };
  sentiment: {
    overall_sentiment: string;
    sales_rep_sentiment: string;
    customer_sentiment: string;
  };
  filler_words: string[];
  longest_monologue_duration: number;
  questions_asked: {
    sales_rep: string[];
    customer: string[];
  };
  actionable_insights: string;
}
// @ts-ignore
const SERVER_URL = `${window.location.hostname}/api` || "http://localhost:5000/api";

function getSettings() {
  return JSON.parse(localStorage.getItem("callAnalysisSettings") || "{}");
}

function checkAssemblyAIKey(settings: any) {
  if (!settings.assemblyAIKey) {
    throw new Error("Assembly AI key not configured");
  }
}

function getClient(settings: any) {
  return new AssemblyAI({ apiKey: settings.assemblyAIKey });
}

function handleTokenExpiration() {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("JWT token not found or expired");
  }
  return token;
}

export async function uploadAudio(file: File) {
  const settings = getSettings();
  checkAssemblyAIKey(settings);

  const formData = new FormData();
  formData.append("audio", file);
  const client = getClient(settings);
  return await client.files.upload(formData);
}

export async function transcribeAudio(audioUrl: string | File) {
  const settings = getSettings();
  checkAssemblyAIKey(settings);

  const client = getClient(settings);
  const config: any = { speaker_labels: true };

  if (typeof audioUrl === "string") {
    config.audio_url = audioUrl;
  } else {
    config.audio = audioUrl;
  }

  const response = await client.transcripts.transcribe(config);
  const { id } = response;

  while (true) {
    const pollResponse = await client.transcripts.get(id);

    if (pollResponse.status === "completed") {
      return pollResponse.utterances
        .map((utterance) => `${utterance.speaker}: ${utterance.text}`)
        .join("\n");
    }

    if (pollResponse.status === "error") {
      throw new Error("Transcription failed");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export async function analyzeTranscript(
  transcript: string,
): Promise<AnalysisResults> {
  // return Promise.resolve({
  //   talk_to_listen_ratio: {
  //     sales_rep: 0.5,
  //     customer: 0.5,
  //   },
  //   objection_count: 0,
  //   competitor_mentions: {},
  //   sentiment: {
  //     overall_sentiment: "neutral",
  //     sales_rep_sentiment: "neutral",
  //     customer_sentiment: "neutral",
  //   },
  //   filler_words: [],
  //   longest_monologue_duration: 0,
  //   questions_asked: {
  //     sales_rep: [],
  //     customer: [],
  //   },
  //   actionable_insights: "",
  // });
  const settings = getSettings();
  const functionParameters = {
    type: "object",
    properties: {
      duration: { type: "string" },
      speakers: { type: "array", items: { type: "string" } },
      sentiment: { type: "string" },
      keywords: { type: "array", items: { type: "string" } },
      clarity: { type: "string" },
      talkToListenRatio: {
        type: "object",
        properties: {
          salesRep: { type: "number" },
          customer: { type: "number" },
        },
      },
      objectionCount: { type: "number" },
      competitorMentions: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      overallSentiment: { type: "string" },
      salesRepSentiment: { type: "string" },
      customerSentiment: { type: "string" },
      fillerWordCount: { type: "number" },
      longestMonologueDuration: { type: "number" },
      questionsAsked: {
        type: "object",
        properties: {
          salesRep: { type: "number" },
          customer: { type: "number" },
        },
      },
    },
    required: ["duration", "speakers", "sentiment", "keywords", "clarity"],
  };

  const response = await fetch(
    settings.modelProvider === "openai"
      ? "https://api.openai.com/v1/chat/completions"
      : `${settings.ollamaHost}/api/generate`,
    {
      method: "POST",
      headers: {
        Authorization: settings.modelProvider === "openai" ? `Bearer ${settings.apiKey}` : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:settings.modelName ,
        prompt: `${METRICS_PROMPT}\nTranscript: ${transcript}`,
        stream: false,
        functions: settings.modelProvider === "openai" ? [{ name: "generateStructuredResponse", parameters: functionParameters }] : undefined,
      }),
    }
  );

  const data = await response.json();
  return settings.modelProvider === "openai"
    ? data.choices[0].message.function_call.arguments
    // ollama model returns a json string
    : JSON.parse(data.response.replace("```json", "").replace("```", "").replace(/\n/g, ""));
}

export async function summarizeTranscript(transcript: string) {
  // return Promise.resolve("This is a summary of the transcript");
  const settings = getSettings();
  const response = await fetch(
    settings.modelProvider === "openai"
      ? "https://api.openai.com/v1/engines/davinci-codex/completions"
      : `${settings.ollamaHost}/api/generate`,
    {
      method: "POST",
      headers: {
        Authorization: settings.modelProvider === "openai" ? `Bearer ${settings.apiKey}` : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:settings.modelName ,
        prompt: `${SUMMARY_PROMPT}\nTranscript: ${transcript}`,
        max_tokens: settings.modelProvider === "openai" ? 150 : undefined,
        temperature: settings.modelProvider === "openai" ? 0.7 : undefined,
        stream: false,
      }),
    }
  );

  const data = await response.json();
  return settings.modelProvider === "openai" ? data.choices[0].text.trim() : data.response;
}

export async function getPersonaResponse(prompt: string): Promise<string> {
  const settings = getSettings();

  const response = await fetch(
    settings.modelProvider === "openai"
      ? "https://api.openai.com/v1/chat/completions"
      : `${settings.ollamaHost}/api/generate`,
    {
      method: "POST",
      headers: {
        Authorization: settings.modelProvider === "openai" ? `Bearer ${settings.apiKey}` : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:settings.modelName ,
        prompt,
        messages: settings.modelProvider === "openai" ? [{ role: "user", content: prompt }] : undefined,
        stream: false,
      }),
    }
  );

  const data = await response.json();
  return settings.modelProvider === "openai" ? data.choices[0].message.function_call.arguments : data.response;
}

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}

export async function storeCallAnalytics(data: CallAnalytics) {
  const { summary, analysis, audioUrl, transcript } = data;
  const token = handleTokenExpiration();

  const response = await fetch(`${SERVER_URL}/metrics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ summary, analysis, transcript, audioUrl }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error('Unauthorized: Token has been cleared and user logged out');
  }

  if (!response.ok) {
    throw new Error('Failed to store call analytics');
  }

  return response.json();
}

export const fetchCallMetrics = async () => {
  try {
    const token = handleTokenExpiration();
    const response = await fetch(`${SERVER_URL}/metrics`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch call metrics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching call metrics:', error);
  }
};

export async function fetchCallMetricById(id: string): Promise<CallMetric | null> {
  try {
    const token = handleTokenExpiration();
    const response = await fetch(`${SERVER_URL}/metrics/?id=${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch call metric');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching call metric:', error);
    throw error;
  }
}

export async function deleteCallMetric(id: string) {
  const token = handleTokenExpiration();

  const response = await fetch(`${SERVER_URL}/metrics/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error('Unauthorized: Token has been cleared and user logged out');
  }

  if (!response.ok) {
    throw new Error('Failed to delete call metric');
  }

  return response.json();
}
