import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Mic, PhoneCall, BarChart2, User, Clock, ThumbsUp, Loader } from "lucide-react";
import { uploadAudio, transcribeAudio, getPersonaResponse } from "../services/api";
import { PERSONA_PROMPT } from "../services/prompt";

export default function ColdCallPractice() {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startCall = () => {
    if (selectedPersona) {
      setIsCallActive(true);
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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        // const audioUrl = await uploadAudio(audioBlob as File);

        const transcript = await transcribeAudio(audioBlob as unknown as File);

        const newConversation = [...conversation, `user: ${transcript}`]
        setConversation(newConversation);
        const prompt = PERSONA_PROMPT(selectedPersona, newConversation)
        const response = await getPersonaResponse(prompt)

        setConversation((prev) => [...prev, `Prospect: ${response}`])
        setLoading(false);
      };
      setRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Cold Call Practice Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="practice" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="metrics" className="hidden md:block">
                Metrics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="practice" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Persona</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={setSelectedPersona} disabled={isCallActive}>
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
                        <SelectItem value="decision-maker">Decision Maker</SelectItem>
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
                      <PhoneCall className="mr-2 h-4 w-4" /> Start Call
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
                  <CardTitle className="text-lg">
                    Conversation Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64 bg-gray-50 rounded-md p-4 overflow-y-auto">
                  {isCallActive ? (
                    <div className="space-y-2">
                      {conversation.map((line, index) => (
                        <p key={index} className={line.startsWith("AI:") ? "font-semibold" : "text-gray-600"}>
                          {line}
                        </p>
                      ))}
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
                              <span>{recording ? "Recording..." : "Hold to Record"}</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      Select a persona and start the call to begin the
                      simulation.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Performance Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                      Strong opening, clear introduction of the product
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      Improve pacing, allow more time for prospect responses
                    </li>
                    <li className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-blue-500" />
                      Good rapport building, maintain throughout the call
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <MetricCard
                      title="Total Calls"
                      value="24"
                      icon={<PhoneCall className="h-4 w-4" />}
                    />
                    <MetricCard
                      title="Avg. Call Duration"
                      value="4m 32s"
                      icon={<Clock className="h-4 w-4" />}
                    />
                    <MetricCard
                      title="Success Rate"
                      value="68%"
                      icon={<BarChart2 className="h-4 w-4" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-blue-100 p-2 text-blue-600">{icon}</div>
      </CardContent>
    </Card>
  );
}
