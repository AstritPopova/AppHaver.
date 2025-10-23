import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";

const Loader: React.FC = () => (
  <IonPage>
    <IonContent className="ion-padding" fullscreen>
      <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
        <IonSpinner name="crescent" />
      </div>
    </IonContent>
  </IonPage>
);

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
