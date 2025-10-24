import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonButton,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <IonHeader translucent>
        <IonToolbar className="glass-header">
          <IonButtons slot="start">
            <IonMenuButton menu="mainMenu" />
          </IonButtons>
          <IonTitle>AppHaver</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="forest-bg" fullscreen>
        <div className="center-wrap">
          <div className="glass-card">
            <h2 className="card-title">Welcome 👋</h2>
            <p>Logged in as: <strong>{auth.currentUser?.email ?? "unknown"}</strong></p>

            <IonButton expand="block" color="medium" onClick={handleLogout} style={{ marginTop: 12 }}>
              Logout
            </IonButton>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default Home;
