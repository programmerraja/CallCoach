import { useState } from "react";
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
import { Mic, PhoneCall, BarChart2, User, Clock, ThumbsUp } from "lucide-react";

export default function ColdCallPractice() {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  const startCall = () => {
    if (selectedPersona) {
      setIsCallActive(true);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
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
                    <Select onValueChange={setSelectedPersona}>
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
                      <p className="font-semibold">
                        AI: Hello, this is John from XYZ Corp. How may I help
                        you today?
                      </p>
                      <p className="text-gray-600">
                        You: Hello John, I'm calling to discuss our new software
                        solution that can help streamline your business
                        processes.
                      </p>
                      <p className="font-semibold">
                        AI: I see. Can you tell me more about how this software
                        specifically applies to our industry?
                      </p>
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
