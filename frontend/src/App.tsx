import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/pages/PrivateRoute";
import "./App.css";
import { DashboardLayout } from "./components/pages/DashboardLayout";
import { CallMetrics } from "./components/pages/CallAnalysis";
import { SettingsPage } from "./components/pages/Settings";
import ColdCallPractice from "./components/pages/ColdCallPractice";
import NotFound from "./components/pages/NotFound";
import { HomePage } from "./components/pages/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="analysis" element={<CallMetrics />} />
          <Route path="analysis/:id" element={<CallMetrics />} />
          <Route path="cold-call-practice" element={<ColdCallPractice />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
