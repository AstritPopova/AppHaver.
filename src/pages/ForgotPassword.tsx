import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setMsg("Please enter your email");
      setOpen(true);
      return;
    }
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg("Password reset email sent. Check your inbox.");
      setOpen(true);
    } catch (e: unknown) {
      const txt = e instanceof Error ? e.message : "Failed to send reset email";
      setMsg(txt);
      setOpen(true);
    } finally {
      setBusy(false);
    }
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
            <h2 className="card-title">Reset your password</h2>
            <p>Enter your account email. We’ll send a reset link.</p>

            <IonList inset>
              <IonItem lines="inset">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value ?? "")}
                  autocomplete="email"
                  enterkeyhint="done"
                  onKeyUp={(e) => e.key === "Enter" && handleReset()}
                />
              </IonItem>
            </IonList>

            <IonButton
              className="primary-btn"
              expand="block"
              onClick={handleReset}
              disabled={busy}
              style={{ marginTop: 12 }}
            >
              {busy ? "Sending..." : "Send reset link"}
            </IonButton>

            <div className="links-row">
              <Link to="/login">Back to Login</Link>
              <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </IonContent>

      <IonToast
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        message={msg}
        duration={2800}
        color="primary"
        position="top"
      />
    </>
  );
};

export default ForgotPassword;
