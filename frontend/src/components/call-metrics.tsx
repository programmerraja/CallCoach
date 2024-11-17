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
} from "lucide-react";
import { useState } from "react";
import { uploadAudio, transcribeAudio, analyzeTranscript, summarizeTranscript } from "../services/api";
import { toast } from "./ui/toast";


interface AnalysisResults {
  duration: string;
  speakers: string[];
  sentiment: string;
  keywords: string[];
  clarity: string;
}

export function CallMetrics() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

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

      const analysis = await analyzeTranscript(transcript, settings);
      const summary = await summarizeTranscript(transcript, settings);

      setAnalysisResults(analysis);
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
          <Card className="p-6 bg-white">
            {/* <h2 className="text-xl font-semibold mb-2">Upload Call Audio</h2> */}
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
          </Card>

          {/* Call Metrics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Call Metrics</h2>
            <div className="space-y-3">
              <MetricItem 
                icon={<Clock />} 
                title="Call Duration" 
                value={analysisResults?.duration}
                loading={isProcessing}
              />
              <MetricItem icon={<Users />} title="Speaker Identification" />
              <MetricItem icon={<Heart />} title="Sentiment Analysis" />
              <MetricItem icon={<KeyRound />} title="Keyword Highlights" />
              <MetricItem icon={<Mic />} title="Speech Clarity" />
            </div>
          </div>

          {/* Export Options */}
          <div>
            {/* <h2 className="text-xl font-semibold mb-4">Export Options</h2> */}
            <div className="flex justify-center items-center">
              {/* <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button> */}
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

function MetricItem({ 
  icon, 
  title, 
  value, 
  loading 
}: { 
  icon: React.ReactNode; 
  title: string;
  value?: string;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
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
      <Button variant="secondary" size="sm" disabled={!value}>
        View
      </Button>
    </div>
  );
}


