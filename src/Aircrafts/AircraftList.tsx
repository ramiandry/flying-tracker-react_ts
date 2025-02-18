import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from "@mui/material";

// Exemple de données d'avions
const aircrafts = [
  { id: 1, model: "Airbus A320", manufacturer: "Airbus" },
  { id: 2, model: "Boeing 737", manufacturer: "Boeing" },
  { id: 3, model: "Cessna 172", manufacturer: "Cessna" },
  { id: 4, model: "Airbus A380", manufacturer: "Airbus" },
  { id: 5, model: "Boeing 747", manufacturer: "Boeing" },
  { id: 6, model: "Piper Cub", manufacturer: "Piper" },
  { id: 7, model: "Cessna 182", manufacturer: "Cessna" },
  { id: 8, model: "Boeing 767", manufacturer: "Boeing" },
];

const AircraftList: React.FC = () => {
  const [filteredAircrafts, setFilteredAircrafts] = useState(aircrafts);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null); // État de la lettre sélectionnée
  const [selectedAircraft, setSelectedAircraft] = useState<number | null>(null); // ID de l'avion sélectionné

  // Filtrer les avions par lettre
  const filterAircrafts = (letter: string) => {
    const filtered = aircrafts.filter((aircraft) =>
      aircraft.model.toUpperCase().startsWith(letter)
    );
    setFilteredAircrafts(filtered);
    setSelectedLetter(letter); // Mettre à jour la lettre sélectionnée
  };

  // Créer la liste des lettres de l'alphabet
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Gérer le clic sur une ligne du tableau
  const handleRowClick = (aircraftId: number) => {
    // Afficher un message ou une action en fonction de l'avion cliqué
    setSelectedAircraft(aircraftId);
    console.log(`Aircraft with ID ${aircraftId} clicked`);
  };

  return (
    <Box sx={{ padding: 2, width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      {/* Filtre alphabet */}
      <Typography variant="h4" sx={{ marginBottom: 3, marginTop: 7 }}>
        Aircrafts Directory
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 2,
          margin: "0 auto", // Centrer horizontalement
        }}
      >
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant="outlined"
            sx={{
              margin: 0.5,
              backgroundColor: selectedLetter === letter ? "#1e88e5" : "transparent", // Coloration bleue pour la lettre sélectionnée
              color: selectedLetter === letter ? "white" : "black", // Couleur du texte
              "&:hover": {
                backgroundColor: selectedLetter === letter ? "#1e88e5" : "#e3f2fd", // Changer la couleur du hover
              },
            }}
            onClick={() => filterAircrafts(letter)}
          >
            {letter}
          </Button>
        ))}
      </Box>

      {/* Liste des avions avec tableau */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        List of Aircrafts
      </Typography>
      <Divider />
      <TableContainer component={Paper} sx={{ marginTop: 2, margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Model</TableCell>
              <TableCell align="left">Manufacturer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAircrafts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No aircrafts found for this letter.
                </TableCell>
              </TableRow>
            ) : (
              filteredAircrafts.map((aircraft) => (
                <TableRow
                  key={aircraft.id}
                  onClick={() => handleRowClick(aircraft.id)} // Ajouter le gestionnaire de clic sur la ligne
                  sx={{
                    cursor: "pointer", // Indique que la ligne est cliquable
                    backgroundColor: selectedAircraft === aircraft.id ? "#e3f2fd" : "transparent", // Surbrillance de la ligne cliquée
                    "&:hover": {
                      backgroundColor: "#f1f1f1", // Effet de survol
                    },
                  }}
                >
                  <TableCell>{aircraft.model}</TableCell>
                  <TableCell>{aircraft.manufacturer}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AircraftList;
