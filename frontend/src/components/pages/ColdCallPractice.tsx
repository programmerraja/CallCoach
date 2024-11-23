import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Mic, PhoneCall, Loader } from "lucide-react";
import {
  transcribeAudio,
  getPersonaResponse,
  AnalysisResults,
} from "../../services/api";
import { PERSONA_PROMPT } from "../../services/prompt";
import { CallMetrics } from "./CallAnalysis";

export default function ColdCallPractice() {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] =
    useState<Partial<AnalysisResults> | null>(null);

  const isCallAnalysised = useRef(false);

  const startCall = () => {
    if (selectedPersona) {
      setIsCallActive(true);
      setSummary(null);
      setConversation([]);
      setRecording(false);
      setAnalysisResults(null);
      isCallAnalysised.current = false;
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setRecording(false);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setRecording(true);
    });
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        setLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        const transcript = await transcribeAudio(audioBlob as unknown as File);

        const newConversation = [...conversation, `You: ${transcript}`];
        setConversation(newConversation);
        const prompt = PERSONA_PROMPT(selectedPersona, newConversation);
        const response = await getPersonaResponse(prompt);

        setConversation((prev) => [...prev, `Prospect: ${response}`]);
        setLoading(false);
      };
      setRecording(false);
    }
  };

  const updateAnalysisResults = (
    results: Partial<AnalysisResults>,
    summary: string
  ) => {
    setAnalysisResults(results);
    setSummary(summary);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Cold Call Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Persona</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  onValueChange={setSelectedPersona}
                  disabled={isCallActive}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a persona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="curious">Curious</SelectItem>
                    <SelectItem value="skeptical">Skeptical</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="decision-maker">
                      Decision Maker
                    </SelectItem>
                    <SelectItem value="overwhelmed">Overwhelmed</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Call Controls</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center space-x-4">
                <Button
                  onClick={startCall}
                  disabled={isCallActive || !selectedPersona}
                >
                  <PhoneCall className="mr-2 h-4 w-4" />{" "}
                  {conversation.length > 0 ? "Start a New Call" : "Start Call"}
                </Button>
                <Button
                  onClick={endCall}
                  disabled={!isCallActive}
                  variant="destructive"
                >
                  <PhoneCall className="mr-2 h-4 w-4" /> End Call
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversation Simulation</CardTitle>
            </CardHeader>
            <CardContent className="h-64 bg-gray-50 rounded-md p-4 overflow-y-auto">
              {isCallActive || conversation.length > 0 ? (
                <div className="space-y-2">
                  {conversation.map((line, index) => (
                    <p
                      key={index}
                      className={
                        line.startsWith("AI:")
                          ? "font-semibold"
                          : "text-gray-600"
                      }
                    >
                      {line}
                    </p>
                  ))}
                  {isCallActive && (
                    <div className="flex items-center justify-center mt-4">
                      <Button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        className="flex items-center space-x-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4" />
                            <span>
                              {recording ? "Recording..." : "Hold to Record"}
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-center text-gray-500">
                    Select a persona and start the call to begin the simulation.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
        {!isCallActive && conversation.length > 0 && (
          <div className="flex justify-end m-4">
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={isCallAnalysised.current}
            >
              {isCallAnalysised.current ? "View Call Analysis" : "Analyse Call"}
            </Button>
          </div>
        )}
      </Card>
      {!isCallActive && isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 m-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-10 w-full h-full md:max-w-5xl md:max-h-3xl overflow-auto m-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsDialogOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <CallMetrics
              pTranscript={conversation.join("\n")}
              updateAnalysisResults={updateAnalysisResults}
              pSummary={summary}
              pAnalysisResults={analysisResults}
            />
          </div>
        </div>
      )}
    </div>
  );
}
