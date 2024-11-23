import { AssemblyAI } from "assemblyai";
import { METRICS_PROMPT, SUMMARY_PROMPT } from "./prompt";
import { CallMetric } from "../components/pages/Dashboard";
import { authService } from "./authService";
import { OpenAI } from "openai";
import { FunctionDefinition } from "openai/resources/index.mjs";

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
const SERVER_URL = !window.location.hostname.includes("localhost")
  ? `https://${window.location.hostname}/api`
  : "http://localhost:5000/api";

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
  const token = authService.getToken();
  if (!token || isTokenExpired(token)) {
    authService.logout();
    window.location.href = "/login";
    throw new Error("JWT token not found or expired");
  }
  return token;
}

export async function uploadAudio(file: File) {
  // return "";
  const settings = getSettings();
  checkAssemblyAIKey(settings);

  const formData = new FormData();
  formData.append("audio", file);
  const client = getClient(settings);
  return await client.files.upload(formData as any);
}

export async function transcribeAudio(audioUrl: string | File, name?: string) {
  const settings = getSettings();
  checkAssemblyAIKey(settings);

  const client = getClient(settings);
  const config: any = { speaker_labels: true, speech_model: "best" };

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
        .map((utterance) => `${name || utterance.speaker}: ${utterance.text}`)
        .join("\n");
    }

    if (pollResponse.status === "error") {
      throw new Error("Transcription failed");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export async function analyzeTranscript(
  transcript: string
): Promise<AnalysisResults> {
  const settings = getSettings();
  const functionParameters: FunctionDefinition = {
    name: "callAnalysis",
    parameters: {
      type: "object",
      properties: {
        talk_to_listen_ratio: {
          type: "object",
          properties: {
            sales_rep: { type: "number" },
            customer: { type: "number" },
          },
        },
        objection_count: { type: "number" },
        competitor_mentions: {
          type: "object",
          additionalProperties: { type: "number" },
        },
        sentiment: {
          type: "object",
          properties: {
            overall_sentiment: { type: "string" },
            sales_rep_sentiment: { type: "string" },
            customer_sentiment: { type: "string" },
          },
        },
        filler_words: { type: "array", items: { type: "string" } },
        longest_monologue_duration: { type: "number" },
        questions_asked: {
          type: "object",
          properties: {
            sales_rep: { type: "array", items: { type: "string" } },
            customer: { type: "array", items: { type: "string" } },
          },
        },
        actionable_insights: { type: "string" },
      },
    },
    description: "Analyze the transcript of a call",
  };

  if (settings.modelProvider === "openai") {
    const openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: settings.modelName,
      messages: [
        {
          role: "system",
          content: `${METRICS_PROMPT}\nTranscript: ${transcript}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: functionParameters,
        },
      ],
    });

    return JSON.parse(
      response.choices[0].message?.tool_calls?.[0]?.function.arguments || "{}"
    );
  } else {
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: settings.modelName,
        messages: `${METRICS_PROMPT}\nTranscript: ${transcript}`,
        stream: false,
      }),
    });

    const data = await response.json();
    return JSON.parse(
      data.response.replace("```json", "").replace("```", "").replace(/\n/g, "")
    );
  }
}

export async function summarizeTranscript(transcript: string) {
  // return Promise.resolve("This is a summary of the transcript");
  const settings = getSettings();

  if (settings.modelProvider === "openai") {
    const openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: settings.modelName,
      messages: [
        {
          role: "user",
          content: `${SUMMARY_PROMPT}\nTranscript: ${transcript}`,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message?.content?.trim();
  } else {
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: settings.modelName,
        messages: `${SUMMARY_PROMPT}\nTranscript: ${transcript}`,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}

export async function getPersonaResponse(prompt: string): Promise<string> {
  const settings = getSettings();
  if (settings.modelProvider === "openai") {
    const openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: settings.modelName,
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message?.content?.trim();
  } else {
    const response = await fetch(`${settings.ollamaHost}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: settings.modelName,
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
}

export async function storeCallAnalytics(data: CallAnalytics) {
  const { summary, analysis, audioUrl, transcript } = data;
  const token = handleTokenExpiration();

  const response = await fetch(`${SERVER_URL}/metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ summary, analysis, transcript, audioUrl }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized: Token has been cleared and user logged out");
  }

  if (!response.ok) {
    throw new Error("Failed to store call analytics");
  }

  return response.json();
}

export const fetchCallMetrics = async () => {
  try {
    const token = handleTokenExpiration();
    const response = await fetch(`${SERVER_URL}/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch call metrics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching call metrics:", error);
  }
};

export async function fetchCallMetricById(
  id: string
): Promise<CallMetric | null> {
  try {
    const token = handleTokenExpiration();
    const response = await fetch(`${SERVER_URL}/metrics/?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch call metric");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching call metric:", error);
    throw error;
  }
}

export async function deleteCallMetric(id: string) {
  const token = handleTokenExpiration();

  const response = await fetch(`${SERVER_URL}/metrics/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized: Token has been cleared and user logged out");
  }

  if (!response.ok) {
    throw new Error("Failed to delete call metric");
  }

  return response.json();
}
