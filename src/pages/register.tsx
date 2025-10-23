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
      const msg =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(msg);
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
              autocomplete="new-password"
              enterkeyhint="done"
              onKeyUp={(e) => {
                if (e.key === "Enter") handleRegister();
              }}
            />
          </IonItem>
        </IonList>

        {error && !showToast && (
          <IonText color="danger" style={{ display: "block", marginTop: 8 }}>
            {error}
          </IonText>
        )}

        <div style={{ marginTop: 16 }}>
          <IonButton
            expand="block"
            onClick={handleRegister}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Register"}
          </IonButton>
        </div>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <IonButton fill="clear">
            <Link to="/login">Back to Login</Link>
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          message={error}
          duration={2800}
          color="danger"
          position="top"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
