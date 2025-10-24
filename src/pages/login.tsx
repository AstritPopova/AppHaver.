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
  IonText,
  IonToast,
  IonCheckbox,
  IonIcon,
} from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      setShowToast(true);
      return;
    }
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/home");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
      setShowToast(true);
    } finally {
      setSubmitting(false);
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
            <h2 className="card-title">Login</h2>

            <IonList inset>
              <IonItem lines="inset">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value ?? "")}
                  autocomplete="email"
                />
                <IonIcon slot="end" icon={mailOutline} />
              </IonItem>

              <IonItem lines="inset">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value ?? "")}
                  autocomplete="current-password"
                  onKeyUp={(e) => e.key === "Enter" && handleLogin()}
                />
                <IonIcon slot="end" icon={lockClosedOutline} />
              </IonItem>
            </IonList>

            <div className="remember-row">
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IonCheckbox
                  checked={remember}
                  onIonChange={(e) => setRemember(e.detail.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot">Forgot Password?</Link>
            </div>

            {error && !showToast && (
              <IonText color="danger" style={{ display: "block", marginTop: 8 }}>
                {error}
              </IonText>
            )}

            <div style={{ marginTop: 14 }}>
              <IonButton
                className="primary-btn"
                expand="block"
                onClick={handleLogin}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </IonButton>
            </div>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span>Don’t have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </IonContent>

      <IonToast
        isOpen={showToast}
        message={error}
        duration={2800}
        color="danger"
        position="top"
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
};

export default Login;
