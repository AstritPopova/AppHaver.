import React from "react";
import { IonApp } from "@ionic/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./AuthContext";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <IonApp>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!loading && user ? <Navigate to="/home" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={!loading && user ? <Navigate to="/home" replace /> : <Register />}
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
