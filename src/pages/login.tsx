import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonToast,
} from "@ionic/react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password");
      setShowToast(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setError("Password reset email sent!");
      setShowToast(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Could not send reset email";
      setError(msg);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList inset>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value ?? "")}
              autocomplete="email"
              enterkeyhint="next"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value ?? "")}
              autocomplete="current-password"
              enterkeyhint="go"
              onKeyUp={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />
          </IonItem>
        </IonList>

        {/* mahdollinen tekstivirhe lomakkeen alle */}
        {error && !showToast && (
          <IonText color="danger" style={{ display: "block", marginTop: 8 }}>
            {error}
          </IonText>
        )}

        <div style={{ marginTop: 16 }}>
          <IonButton expand="block" onClick={handleLogin} disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </IonButton>
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <IonButton fill="clear" color="medium" onClick={handleResetPassword}>
            Forgot password?
          </IonButton>
        </div>

        <div style={{ textAlign: "center", marginTop: 4 }}>
          <IonButton fill="clear">
            <Link to="/register">Create an account</Link>
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          message={error}
          duration={2800}
          color="primary"
          position="top"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
