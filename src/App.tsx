import React from "react";
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./AuthContext";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <IonApp>
      <BrowserRouter>
        {/* Sidemenu (menuId, jotta MenuButton osaa avata tämän) */}
        <IonMenu contentId="main" side="start" menuId="mainMenu">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem routerLink="/login">Login</IonItem>
              <IonItem routerLink="/register">Register</IonItem>
              <IonItem routerLink="/forgot">Forgot password</IonItem>
              <IonItem routerLink="/home">Home</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        {/* Pääsisältö */}
        <div id="main">
          <Routes>
            <Route
              path="/login"
              element={!loading && user ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={!loading && user ? <Navigate to="/home" replace /> : <Register />}
            />
            <Route path="/forgot" element={<ForgotPassword />} />
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
        </div>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
