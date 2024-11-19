"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Clock,
  Users,
  Heart,
  KeyRound,
  Mic,
  Cloud,
  Download,
  Loader,
  BarChart2,
  List,
  Smile,
  Meh,
  Frown,
  Timer,
  PieChart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { uploadAudio, transcribeAudio, analyzeTranscript, summarizeTranscript } from "../services/api";
import { toast } from "./ui/toast";

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
}

export function CallMetrics() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [expandedMetrics, setExpandedMetrics] = useState<{ [key: string]: boolean }>({});

  const checkSettings = () => {
    const settings = localStorage.getItem("callAnalysisSettings");
    if (!settings) return false;
    
    const parsedSettings = JSON.parse(settings);
    if (parsedSettings.modelProvider === "openai" && !parsedSettings.apiKey) return false;
    if (parsedSettings.modelProvider === "ollama" && !parsedSettings.ollamaHost) return false;
    
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
      
      console.log(transcript,"transcript");

      const [analysis, summary] = await Promise.all([
        analyzeTranscript(transcript, settings),
        Promise.resolve("summary"),
        // summarizeTranscript(transcript, settings)
      ]);

      setAnalysisResults(analysis);
      setSummary(summary);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process audio file",
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

  const toggleExpand = (metric: string) => {
    setExpandedMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 md:bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Upload Call Audio</h1>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          {/* Upload Section */}
          <div className="p-6 bg-white">
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
                  className="mb-4"
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
                        Processing your call recording, this may take a few moments.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        {/* Summary */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Call Summary</h2>
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-600 mb-6">
                {summary}
              </p>
            </div>
          </div>


          {/* Metrics Dashboard */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Metrics</h2>
            <div className="space-y-3">
              <MetricItem 
                icon={<BarChart2 />} 
                title="Talk vs. Listen Ratio" 
                value={`Sales Rep: ${analysisResults?.talk_to_listen_ratio?.sales_rep}% | Customer: ${analysisResults?.talk_to_listen_ratio?.customer}%`}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<List />} 
                title="Total Objections" 
                value={analysisResults?.objection_count?.toString()}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<Users />} 
                title="Competitor Mentions" 
                value={Object.entries(analysisResults?.competitor_mentions || {}).map(([competitor, count]) => `${competitor} - ${count} mention(s)`).join(", ")}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<Smile />} 
                title="Overall Sentiment" 
                value={analysisResults?.sentiment?.overall_sentiment}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<Heart />} 
                title="Sales Rep Sentiment" 
                value={analysisResults?.sentiment?.sales_rep_sentiment}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<Meh />} 
                title="Customer Sentiment" 
                value={analysisResults?.sentiment?.customer_sentiment}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<Mic />} 
                title="Filler Words Used" 
                value={analysisResults?.filler_words?.length?.toString()}
                loading={isProcessing}
                expandableContent={analysisResults?.filler_words?.join(", ")}
                expanded={expandedMetrics["filler_words"]}
                onToggleExpand={() => toggleExpand("filler_words")}
              />
              <MetricItem 
                icon={<Timer />} 
                title="Longest Monologue" 
                value={`${analysisResults?.longest_monologue_duration} seconds`}
                loading={isProcessing}
              />
              <MetricItem 
                icon={<PieChart />} 
                title="Questions Asked" 
                value={`Sales Rep: ${analysisResults?.questions_asked?.sales_rep.length} | Customer: ${analysisResults?.questions_asked?.customer.length}`}
                loading={isProcessing}
                expandableContent={`Sales Rep: ${analysisResults?.questions_asked?.sales_rep.join(", ")} | Customer: ${analysisResults?.questions_asked?.customer.join(", ")}`}
                expanded={expandedMetrics["questions_asked"]}
                onToggleExpand={() => toggleExpand("questions_asked")}
              />
            </div>
          </div>

          {/* Actionable Insights */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Actionable Insights</h2>
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-600 mb-6">
                {`The sales rep maintained a positive tone throughout the call, but the customer expressed a neutral sentiment. Consider reducing filler words to improve communication clarity. Customer mentioned ${Object.keys(analysisResults?.competitor_mentions || {}).join(", ")} once—this could indicate potential concerns.`}
              </p>
            </div>
          </div>

          
          {/* Export Options */}
          <div>
            <div className="flex justify-center items-center">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <div>
        <span className="font-medium">{title}</span>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
}

function MetricItem({ 
  icon, 
  title, 
  value, 
  loading, 
  expandableContent, 
  expanded, 
  onToggleExpand 
}: { 
  icon: React.ReactNode; 
  title: string;
  value?: string;
  loading?: boolean;
  expandableContent?: string;
  expanded?: boolean;
  onToggleExpand?: () => void;
}) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            {icon}
          </div>
          <div>
            <span className="font-medium">{title}</span>
            {loading && <p className="text-sm text-gray-500">Analyzing...</p>}
            {value && <p className="text-sm text-gray-500">{value}</p>}
          </div>
        </div>
        {expandableContent && (
          <button onClick={onToggleExpand} className="text-gray-500">
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        )}
      </div>
      {expanded && expandableContent && (
        <div className="mt-2 text-sm text-gray-500">
          {expandableContent}
        </div>
      )}
    </div>
  );
}
