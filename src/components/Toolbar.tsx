import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterListIcon from "@mui/icons-material/FilterList";
import WidgetsIcon from "@mui/icons-material/Widgets";
import HistoryIcon from "@mui/icons-material/History";
import SettingsPanel from "./SettingsPanel";

const Toolbar = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  

  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px",
        padding: "10px 20px",
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        boxShadow: 3,
        width: "auto",
        gap: 2,
      }}
    >
      <ToolbarButton
        icon={<SettingsIcon />}
        label="Settings"
        active={activeButton === "Settings"}
        onClick={() => {
          setIsVisible(!isVisible);
          !isVisible ? setActiveButton("Settings") : setActiveButton(null);
        }}
      />
      <ToolbarButton
        icon={<WbSunnyIcon />}
        label="Weather"
        active={activeButton === "Weather"}
        onClick={() => setActiveButton("Weather")}
      />
      <ToolbarButton
        icon={<FilterListIcon />}
        label="Filters"
        active={activeButton === "Filters"}
        onClick={() => setActiveButton("Filters")}
      />
      <ToolbarButton
        icon={<WidgetsIcon />}
        label="Widgets"
        active={activeButton === "Widgets"}
        onClick={() => setActiveButton("Widgets")}
      />
      <ToolbarButton
        icon={<HistoryIcon />}
        label="Playback"
        active={activeButton === "Playback"}
        onClick={() => setActiveButton("Playback")}
      />
    </Box>
    <SettingsPanel isVisible={isVisible} setIsVisible={setIsVisible}/>
    </>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <IconButton
        sx={{
          color: active ? "yellow" : "white",
          transition: "color 0.2s ease-in-out",
        }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
      <Typography sx={{ color: active ? "yellow" : "white", fontSize: "12px" }}>
        {label}
      </Typography>
    </Box>
  );
};

export default Toolbar;
