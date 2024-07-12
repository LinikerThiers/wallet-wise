import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './assets/components/loginPage/loginPage';
import RegisterPage from './assets/components/registerPage/registerPage';
import ForgotPassword from './assets/components/forgotPassword/forgotPassword';
import ProtectedRoute from './assets/components/ProtectedRoute/ProtectedRoute';
import './App.css'
import Dashboard from './assets/components/dashboard/dashboard';
import ChangePassword from './assets/components/forgotPassword/changePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
