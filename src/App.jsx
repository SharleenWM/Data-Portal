import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthForm from "./Auth/AuthForm.jsx";
import Dashboard from "./Dashboard";
import CreateDepartment from "./pages/Departments/CreateDepartment.jsx";
import CreateProject from "./pages/Projects/CreateProjects.jsx";
import CreateProcess from "./pages/Processes/CreateProcess.jsx";
import CreateRisk from "./pages/Risks/CreateRisk.jsx";

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // optional: track user info

  const handleLoginSuccess = (userData) => {
    console.log("✅ Logged in:", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Private route: Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/create-department"
          element={
            isAuthenticated ? (
              <CreateDepartment />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/create-project"
          element={
            isAuthenticated ? (
              <CreateProject />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/create-process"
          element={
            isAuthenticated ? (
              <CreateProcess />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/create-risk"
          element={
            isAuthenticated ? <CreateRisk /> : <Navigate to="/auth" replace />
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
