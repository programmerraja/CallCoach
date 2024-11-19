import { Button } from "./ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { useState } from "react";

export function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen overflow-x-hidden">
      
      <header className="md:hidden flex items-center justify-between p-4 border-b w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
          <h2 className="font-semibold">Sales Analytics AI</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </header>

     
    </div>
  );
}
