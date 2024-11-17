import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/home-page";
import { Welcome } from "./components/welcome";
import { SettingsPage } from "./components/settings-page";
import { CallMetrics } from "./components/call-metrics";
import ColdCallPractice from "./components/sales-assistant";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Welcome />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="metrics" element={<CallMetrics />} />
          <Route path="assistant" element={<ColdCallPractice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
