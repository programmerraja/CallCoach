import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export function Welcome() {
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const settings = localStorage.getItem("callAnalysisSettings");
    setIsConfigured(!!settings);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-6 p-4 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
        Welcome to Sales Analytics AI
      </h1>

      <div className="max-w-4xl text-center space-y-4 px-4">
        <p className="text-base md:text-lg text-muted-foreground">
          Your intelligent companion for sales analysis and real-time
          assistance. Monitor call metrics and get AI-powered sales guidance to
          improve your performance.
        </p>
      </div>

      {!isConfigured ? (
        <Button size="lg" asChild>
          <Link to="/settings">Get Started</Link>
        </Button>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/metrics">View Call Metrics</Link>
          </Button>
          <Button size="lg" asChild>
            <Link to="/assistant">Sales Assistant</Link>
          </Button>
        </div>
      )}
    </div>
  );
} 