// src/types/firebaseConfig.d.ts

// Kun importaat juuripolusta (esim. App.tsx, AuthContext.tsx): "./firebaseConfig"
declare module "./firebaseConfig" {
  import type { Auth } from "firebase/auth";
  export const auth: Auth;
}

// Kun importaat sivuilta (../firebaseConfig)
declare module "../firebaseConfig" {
  import type { Auth } from "firebase/auth";
  export const auth: Auth;
}
