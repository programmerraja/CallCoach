import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen overflow-x-hidden bg-background">
      <Navigation />
      <main className="flex-1 bg-background w-full">
        <Outlet />
      </main>
    </div>
  );
}
