"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Heart,
  Cloud,
  Loader,
  Smile,
  Meh,
  Frown,
  Timer,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  uploadAudio,
  transcribeAudio,
  fetchCallMetricById,
  storeCallAnalytics,
  analyzeTranscript,
  summarizeTranscript,
} from "../services/api";
import { toast } from "./ui/toast";
import ReactMarkdown from "react-markdown";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export function CallMetrics() {
  const { id } = useParams();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] =
    useState<Partial<AnalysisResults> | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [expandedMetrics, setExpandedMetrics] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (!id) return;

    fetchCallMetricById(id)
      .then((data) => {
        if (data) {
          setAnalysisResults(data[0].analysis);
          setSummary(data[0].summary);
        } else {
          toast({
            title: "Error",
            description: "Call metric not found",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error fetching call metric",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [id]);

  const checkSettings = () => {
    const settings = localStorage.getItem("callAnalysisSettings");
    if (!settings) return false;

    const parsedSettings = JSON.parse(settings);
    if (parsedSettings.modelProvider === "openai" && !parsedSettings.apiKey)
      return false;
    if (parsedSettings.modelProvider === "ollama" && !parsedSettings.ollamaHost)
      return false;

    return parsedSettings;
  };

  const handleFileUpload = async (file: File) => {
    const settings = checkSettings();
    if (!settings) {
      toast({
        title: "Configuration Required",
        description: "Please configure your AI settings first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const audioUrl = await uploadAudio(file);
      const transcript = await transcribeAudio(audioUrl);

      const [analysis, summary] = await Promise.all([
        analyzeTranscript(transcript, settings),
        summarizeTranscript(transcript, settings),
      ]);
      setAnalysisResults(analysis);
      setSummary(summary);
      console.log(transcript, "transcript");
      setTranscript(transcript);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process audio file",
        variant: "destructive",
      });
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

  const handleSaveMetrics = async () => {
    if (!analysisResults) return;

    try {
      await storeCallAnalytics({
        summary,
        analysis: analysisResults,
        transcript,
        audioUrl: "",
      });
      toast({
        title: "Success",
        description: "Metrics saved successfully",
      });
      // Reset state to allow user to upload another file
      setAudioFile(null);
      setAnalysisResults(null);
      setSummary(null);
      setTranscript(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save metrics",
        variant: "destructive",
      });
    }
  };

  const toggleMetric = (metricName: string) => {
    setExpandedMetrics((prev) => ({
      ...prev,
      [metricName]: !prev[metricName],
    }));
  };

  const renderSentimentEmoji = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return <Smile className="w-6 h-6 text-green-500" />;
      case "neutral":
        return <Meh className="w-6 h-6 text-yellow-500" />;
      case "negative":
        return <Frown className="w-6 h-6 text-red-500" />;
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
              {data.map((entry, index) => (
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      {!id && !analysisResults && (
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6" />
                <h1 className="text-xl font-semibold">Upload Call Audio</h1>
              </div>
            </header>
            <p className="text-sm text-gray-600 mb-6">
              Please upload your call recording file. Accepted formats include
              .mp3, .wav, and .aac. Ensure the file is clear and of good quality
              for accurate analysis.
            </p>
            <div className="border-2 border-dashed rounded-lg p-8 mb-4 flex flex-col items-center justify-center gap-4">
              {!audioFile && (
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
                  {isProcessing && (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin w-5 h-5 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        Processing your call recording, this may take a few
                        moments.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
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

      {/* Talk Time Distribution */}
      {analysisResults && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Talk Time Distribution</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleMetric("talkTime")}
            >
              {expandedMetrics["talkTime"] ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          {expandedMetrics["talkTime"] && renderTalkTimeChart()}
        </Card>
      )}

      {/* Call Summary */}
      {summary && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Call Summary</h2>
          <ReactMarkdown className="prose max-w-none">{summary}</ReactMarkdown>
        </Card>
      )}

      {/* Transcript */}
      {transcript && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Transcript</h2>

          {transcript.split("\n").map((t) => (
            <p className="mb-4">{t}</p>
          ))}
        </Card>
      )}

      {/* Save Metrics Button */}
      {analysisResults && !id && (
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={handleSaveMetrics}>
            Save Metrics
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setAudioFile(null);
              setAnalysisResults(null);
              setSummary(null);
              setTranscript(null);
            }}
          >
            Discard and Upload Another
          </Button>
        </div>
      )}
    </div>
  );
}
