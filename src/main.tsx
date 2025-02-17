import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SettingsProvider } from "./components/SettingsContext.tsx";

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
    <SettingsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>
);
