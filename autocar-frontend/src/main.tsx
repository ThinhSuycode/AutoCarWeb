import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>,
);
