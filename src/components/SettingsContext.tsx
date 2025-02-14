import React, { createContext, useState, useContext } from "react";

// Définition du type pour le contexte
interface SettingsContextType {
  urlMap: string;
  setUrlMap: (urlMap: string) => void;
}

// Création du contexte
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider qui englobe l'application
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [urlMap, setUrlMap] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

  return (
    <SettingsContext.Provider value={{ urlMap, setUrlMap }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings doit être utilisé à l'intérieur d'un SettingsProvider");
  }
  return context;
};


