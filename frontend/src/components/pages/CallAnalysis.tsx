import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Heart,
  Cloud,
  Loader,
  Smile,
  Meh,
  Frown,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  uploadAudio,
  transcribeAudio,
  fetchCallMetricById,
  storeCallAnalytics,
  analyzeTranscript,
  summarizeTranscript,
  AnalysisResults,
} from "../../services/api";
import { toast } from "../ui/toast";
import ReactMarkdown from "react-markdown";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

export function CallMetrics({
  pTranscript,
  updateAnalysisResults,
  pSummary,
  pAnalysisResults,
}: {
  pTranscript?: string;
  updateAnalysisResults?: (
    results: Partial<AnalysisResults>,
    summary: string
  ) => void;
  pSummary?: string;
  pAnalysisResults?: Partial<AnalysisResults>;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(
    !!pTranscript && !pSummary && !pAnalysisResults
  );
  const [summary, setSummary] = useState<string | null>(pSummary || null);
  const [analysisResults, setAnalysisResults] =
    useState<Partial<AnalysisResults> | null>(pAnalysisResults || null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const isCalled = useRef(false);

  useEffect(() => {
    if (pTranscript && !isCalled.current && !pSummary && !pAnalysisResults) {
      isCalled.current = true;
      handleFileUpload(null, pTranscript);
    }
    if (!id && !pTranscript) {
      resetState();
      return;
    }
    if (id) {
      fetchCallMetricById(id)
        .then((data) => {
          if (data) {
            setAnalysisResults(data[0].analysis);
            setSummary(data[0].summary);
            setTranscript(data[0].transcript);
          } else {
            showToast("Error", "Call metric not found");
          }
        })
        .catch((error) => {
          showToast("Error", error.message);
        });
    }
  }, [id, pTranscript]);

  const resetState = () => {
    setAnalysisResults(null);
    setSummary(null);
    setTranscript(null);
  };

  const showToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const checkSettings = () => {
    const settings = localStorage.getItem("callAnalysisSettings");
    if (!settings) {
      showToast(
        "Configuration Required",
        "Please configure your AI settings first"
      );
      navigate("/dashboard/settings");
      return;
    }

    const parsedSettings = JSON.parse(settings);
    if (
      (parsedSettings.modelProvider === "openai" && !parsedSettings.apiKey) ||
      (parsedSettings.modelProvider === "ollama" && !parsedSettings.ollamaHost)
    ) {
      showToast(
        "Configuration Required",
        "Please configure your AI settings first"
      );
      navigate("/dashboard/settings");
      return;
    }

    return parsedSettings;
  };

  const handleFileUpload = async (file: File | null, transcript?: string) => {
    const settings = checkSettings();
    if (!settings) {
      return;
    }

    setIsProcessing(true);
    try {
      let transcribedText = transcript;
      if (!transcript && file) {
        const audioUrl = await uploadAudio(file);
        transcribedText = await transcribeAudio(audioUrl);
      }

      const [analysis, summary] = await Promise.all([
        analyzeTranscript(transcribedText),
        summarizeTranscript(transcribedText),
      ]);
      setAnalysisResults(analysis);
      setSummary(summary);
      updateAnalysisResults && updateAnalysisResults(analysis, summary);
      setTranscript(transcribedText);
    } catch (error) {
      showToast(
        "Error",
        error instanceof Error ? error.message : "Failed to process audio file"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      handleFileUpload(file);
    }
  };

  const handleDeselectFile = () => {
    setAudioFile(null);
    setIsProcessing(false);
    resetState();
  };

  const handleSaveMetrics = async () => {
    if (!analysisResults) return;

    try {
      await storeCallAnalytics({
        summary,
        analysis: analysisResults,
        transcript,
        audioUrl: "",
      });
      showToast("Success", "Metrics saved successfully");
    } catch (error) {
      showToast("Error", "Failed to save metrics");
    }
  };

  const renderSentimentEmoji = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return (
          <div className="group relative">
            <Smile className="w-6 h-6 text-green-500" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
              Positive
            </span>
          </div>
        );
      case "neutral":
        return (
          <div className="group relative">
            <Meh className="w-6 h-6 text-yellow-500" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
              Neutral
            </span>
          </div>
        );
      case "negative":
        return (
          <div className="group relative">
            <Frown className="w-6 h-6 text-red-500" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
              Negative
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMetricCard = (
    title: string,
    value: React.ReactNode,
    icon: React.ReactNode,
    description?: string
  ) => (
    <Card className="p-4 flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </Card>
  );

  const renderTalkTimeChart = () => {
    if (!analysisResults?.talk_to_listen_ratio) return null;

    const data = [
      {
        name: "Sales Rep",
        value: analysisResults.talk_to_listen_ratio.sales_rep,
      },
      {
        name: "Customer",
        value: analysisResults.talk_to_listen_ratio.customer,
      },
    ];

    const COLORS = ["#0088FE", "#00C49F"];

    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderQuestionsAsked = () => {
    if (!analysisResults?.questions_asked) return null;

    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Questions Asked</h2>
        <div className="space-y-4">
          {analysisResults.questions_asked?.sales_rep?.length ? (
            <div>
              <h3 className="text-md font-medium">Sales Rep:</h3>
              <ul className="list-disc list-inside">
                {analysisResults.questions_asked.sales_rep.map(
                  (question, index) => (
                    <li key={index}>{question}</li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <h3 className="text-md font-medium">Sales Rep: None</h3>
          )}
          {analysisResults.questions_asked?.customer?.length ? (
            <div>
              <h3 className="text-md font-medium">Customer:</h3>
              <ul className="list-disc list-inside">
                {analysisResults.questions_asked.customer.map(
                  (question, index) => (
                    <li key={index}>{question}</li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <h3 className="text-md font-medium">Customer: None</h3>
          )}
        </div>
      </Card>
    );
  };

  const renderFillerWords = () => {
    if (!analysisResults?.filler_words || analysisResults?.filler_words?.length === 0) return null;

    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Filler Words</h2>
        <ul className="list-disc list-inside">
          {analysisResults.filler_words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </Card>
    );
  };

  const renderActionableInsights = () => {
    if (!analysisResults?.actionable_insights) return null;

    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Actionable Insights</h2>
        <p>{analysisResults.actionable_insights}</p>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {!id && !analysisResults && (
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6" />
                <h1 className="text-xl font-semibold">
                  {pTranscript ? "Call Analysis" : "Upload Call Recording"}{" "}
                </h1>
              </div>
            </header>
            {!pTranscript && (
              <>
                <p className="text-sm text-gray-600 mb-6">
                  Please upload your call recording file. Accepted formats
                  include .mp3, .wav, and .aac. Ensure the file is clear and of
                  good quality for accurate analysis.
                </p>
              </>
            )}
            <div className="border-2 border-dashed rounded-lg p-8 mb-4 flex flex-col items-center justify-center gap-4">
              {!audioFile && !isProcessing && (
                <input
                  type="file"
                  accept=".mp3,.wav,.aac"
                  onChange={handleFileChange}
                  className="mb-4 cursor-pointer"
                />
              )}
              {audioFile && (
                <>
                  <p className="text-sm text-gray-500">
                    Selected file: {audioFile.name}
                  </p>
                  <Button variant="outline" onClick={handleDeselectFile}>
                    Stop Processing
                  </Button>
                </>
              )}
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Processing your call recording, this may take a few moments.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {analysisResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderMetricCard(
            "Objection Count",
            analysisResults.objection_count || 0,
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          {renderMetricCard(
            "Longest Monologue",
            `${analysisResults.longest_monologue_duration || 0}s`,
            <Timer className="h-5 w-5 text-blue-500" />
          )}
          {renderMetricCard(
            "Overall Sentiment",
            renderSentimentEmoji(
              analysisResults.sentiment?.overall_sentiment || ""
            ),
            <Heart className="h-5 w-5 text-pink-500" />
          )}
        </div>
      )}

      {analysisResults && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Talk Time Distribution</h2>
          </div>
          {renderTalkTimeChart()}
        </Card>
      )}

      {summary && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Call Summary</h2>
          <ReactMarkdown className="prose max-w-none">{summary}</ReactMarkdown>
        </Card>
      )}

      {renderQuestionsAsked()}

      {renderFillerWords()}

      {renderActionableInsights()}

      {transcript && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Transcript</h2>
          {transcript.split("\n").map((t, index) => (
            <p key={index} className="mb-4">
              {t}
            </p>
          ))}
        </Card>
      )}

      {analysisResults && !id && (
        <div className="flex justify-end space-x-4">
          <Button onClick={handleSaveMetrics}>Save Metrics</Button>
          {!pTranscript && (
            <Button onClick={resetState}>Discard and Upload Another</Button>
          )}
        </div>
      )}
    </div>
  );
}
