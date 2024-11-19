import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-6xl font-extrabold mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Button size="lg" variant="outline" className="flex items-center gap-2">
        <Link to="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          Go to Home
        </Link>
      </Button>
    </div>
  );
}
