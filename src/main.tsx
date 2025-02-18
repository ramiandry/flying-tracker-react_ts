import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SettingsProvider } from "./components/SettingsContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Créez un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    // Autres personnalisations...
  },
  transitions: {
    // Si vous voulez personnaliser les transitions, vous pouvez les ajouter ici
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="681010265618-lk2n2lr84pq4l12rnopndkkfku0p4pc6.apps.googleusercontent.com">
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SettingsProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
