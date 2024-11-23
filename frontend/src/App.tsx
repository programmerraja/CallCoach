import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/pages/PrivateRoute";
import "./App.css";
import { DashboardLayout } from "./components/pages/DashboardLayout";
import { CallMetrics } from "./components/pages/CallAnalysis";
import { SettingsPage } from "./components/pages/Settings";
import ColdCallPractice from "./components/pages/ColdCallPractice";
import NotFound from "./components/pages/NotFound";
import { Dashboard } from "./components/pages/Dashboard";
import HomePage from "./components/pages/homePage";

function App() {
  const isAuthenticated = () => {
    // Implement your authentication logic here
    // For example, check if a token exists in local storage
    return !!localStorage.getItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analysis" element={<CallMetrics />} />
          <Route path="analysis/:id" element={<CallMetrics />} />
          <Route path="cold-call-practice" element={<ColdCallPractice />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
