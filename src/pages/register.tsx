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
} from "@ionic/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      setShowToast(true);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setShowToast(true);
      return;
    }
    setSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigate("/home");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
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
            <h2 className="card-title">Register</h2>
            <p>Create your account to continue</p>

            <IonList inset>
              <IonItem lines="inset">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value ?? "")}
                  autocomplete="email"
                />
              </IonItem>

              <IonItem lines="inset">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value ?? "")}
                  autocomplete="new-password"
                  onKeyUp={(e) => e.key === "Enter" && handleRegister()}
                />
              </IonItem>
            </IonList>

            {error && !showToast && (
              <IonText color="danger" style={{ display: "block", marginTop: 8 }}>
                {error}
              </IonText>
            )}

            <div style={{ marginTop: 14 }}>
              <IonButton
                className="primary-btn"
                expand="block"
                onClick={handleRegister}
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Register"}
              </IonButton>
            </div>

            <div className="links-row">
              <Link to="/login">Back to Login</Link>
              <Link to="/forgot">Forgot password</Link>
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

export default Register;
