"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Save, LogOut, User, Info } from "lucide-react";
import { toast } from "../ui/toast";

interface Settings {
  apiKey: string;
  modelProvider: string;
  modelName: string;
  ollamaHost: string;
  assemblyAIKey: string;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    apiKey: "",
    modelProvider: "openai",
    modelName: "gpt-3.5-turbo",
    ollamaHost: "http://localhost:11434",
    assemblyAIKey: "",
  });

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("callAnalysisSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleSave = () => {
    if (!settings.assemblyAIKey) {
      toast({
        title: "Error",
        description: "Assembly AI Key is required",
        variant: "destructive",
      });
      return;
    }

    if (settings.modelProvider === "openai" && !settings.apiKey) {
      toast({
        title: "Error",
        description: "OpenAI API Key is required",
        variant: "destructive",
      });
      return;
    }

    if (settings.modelProvider === "ollama" && !settings.ollamaHost) {
      toast({
        title: "Error",
        description: "Ollama Host URL is required",
        variant: "destructive",
      });
      return;
    }

    // Save settings to localStorage
    localStorage.setItem("callAnalysisSettings", JSON.stringify(settings));
    toast({
      title: "Success",
      description: "Settings saved successfully. Note: The key will not be stored in the backend, it will only be stored in localStorage.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("callAnalysisSettings");
    localStorage.removeItem("token");
    
    window.location.href = "/login";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
              <User className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{username}</h2>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Model Configuration</h2>
        
        <div className="space-y-4">
          {/* Assembly AI Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assembly AI API Key</label>
            <Input
              type="password"
              value={settings.assemblyAIKey}
              onChange={(e) =>
                setSettings({ ...settings, assemblyAIKey: e.target.value })
              }
              placeholder="Enter your Assembly AI API key"
            />
            <p className="text-sm text-gray-500">
              Required for audio transcription. Get your key from{" "}
              <a 
                href="https://www.assemblyai.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline"
              >
                Assembly AI
              </a>
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Info className="w-4 h-4 mr-1 text-cyan-600" />
              <span>Note: The key will not be stored in the backend, it will only be stored in localStorage.</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model Provider</label>
            <Select
              value={settings.modelProvider}
              onValueChange={(value) =>
                setSettings({ ...settings, modelProvider: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="ollama">Ollama</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.modelProvider === "openai" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API Key</label>
              <Input
                type="password"
                value={settings.apiKey}
                onChange={(e) =>
                  setSettings({ ...settings, apiKey: e.target.value })
                }
                placeholder="sk-..."
              />
              
              <label className="text-sm font-medium">Model</label>
              <Select
                value={settings.modelName}
                onValueChange={(value) =>
                  setSettings({ ...settings, modelName: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {settings.modelProvider === "ollama" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Ollama Host URL</label>
              <Input
                type="text"
                value={settings.ollamaHost}
                onChange={(e) =>
                  setSettings({ ...settings, ollamaHost: e.target.value })
                }
                placeholder="http://localhost:11434"
              />
              
              <label className="text-sm font-medium">Model</label>
              <Select
                value={settings.modelName}
                onValueChange={(value) =>
                  setSettings({ ...settings, modelName: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama2">Llama 2</SelectItem>
                  <SelectItem value="mistral">Mistral</SelectItem>
                  <SelectItem value="codellama">Code Llama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

          <Button
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
        </Button>
      </Card>
    </div>
  );
} 