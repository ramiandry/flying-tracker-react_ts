import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Box, Avatar, Typography } from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, Flight as FlightIcon, Map as MapIcon, Settings as SettingsIcon } from "@mui/icons-material";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
    // Fonction pour gérer le clic sur un élément de menu
    const handleClick = () => {
      console.log("Menu item clicked");
    };

  // Fonction pour ouvrir/fermer la sidebar
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Bouton pour ouvrir la sidebar */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 999999999, // Pour être au-dessus de la sidebar
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250, // Largeur de la sidebar
            background: "linear-gradient(to bottom, #2c2f36, #1e1e1e)", // Dégradé de couleur
            color: "white", // Texte en blanc
            borderRight: "2px solid #1e88e5", // Bordure pour séparer
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "#2c2f36", // En-tête sombre
            borderBottom: "2px solid #1e88e5", // Séparateur en bas de l'en-tête
          }}
        >
          <Avatar sx={{ width: 60, height: 60, marginBottom: 1 }} />
          <Typography variant="body1" sx={{ color: "white" }}>
            User Name
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#1e88e5" }} />

        <List>
          <ListItem >
            <HomeIcon sx={{ color: "#1e88e5", marginRight: 2 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem >
            <FlightIcon sx={{ color: "#1e88e5", marginRight: 2 }} />
            <ListItemText primary="Flights" />
          </ListItem>
          <ListItem >
            <MapIcon sx={{ color: "#1e88e5", marginRight: 2 }} />
            <ListItemText primary="Map" />
          </ListItem>
          <ListItem >
            <SettingsIcon sx={{ color: "#1e88e5", marginRight: 2 }} />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
