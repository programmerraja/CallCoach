import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { DashboardLayout } from './components/DashboardLayout';
import { CallMetrics } from './components/call-metrics';
import { SettingsPage } from './components/settings-page';
import ColdCallPractice from './components/sales-assistant';
import NotFound from './components/not-found';
import { HomePage } from './components/home-page';
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
          <Route path="metrics" element={<CallMetrics />} />
          <Route path="metrics/:id" element={<CallMetrics />} />
          <Route path="assistant" element={<ColdCallPractice />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
  );
}

export default App;