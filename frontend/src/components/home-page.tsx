import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Settings, ChartLine, Menu, User } from "lucide-react";
import { useState } from "react";

export function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const NavButton = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Button
      variant={location.pathname === to ? "default" : "ghost"}
      className="w-full md:w-auto justify-start"
      asChild
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Link to={to}>
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
    </Button>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen overflow-x-hidden">
      
      <header className="md:hidden flex items-center justify-between p-4 border-b w-full">
        <h2 className="font-semibold">Sales Analytics AI</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </header>

     
      <nav className={`
        ${isMobileMenuOpen ? 'flex' : 'hidden'} 
        md:flex flex-col gap-2 p-4 
        bg-gray-100 
        md:min-h-screen md:w-64
        absolute md:relative
        top-[64px] md:top-0
        left-0 right-0
        z-50
        md:z-auto
        border-r
      `}>
        <NavButton to="/" icon={<Home className="h-5 w-5" />} label="Home" />
        <NavButton to="/metrics" icon={<ChartLine className="h-5 w-5" />} label="Metrics" />
        <NavButton to="/assistant" icon={<User className="h-5 w-5" />} label="Sales Assistant" />
        <NavButton to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </nav>

    
      <main className="flex-1 bg-background w-full">
        <Outlet />
      </main>
    </div>
  );
}
