import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Slider,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Import des images
import altas from "../assets/images/maps/atlas-294.png";
import cycle from "../assets/images/maps/opencyclemap-294.png";
import landscape from "../assets/images/maps/landscape-294.png";
import mobileAtlas from "../assets/images/maps/mobile-atlas-294.png";
import neighbourhood from "../assets/images/maps/neighbourhood-294.png";
import outdoors from "../assets/images/maps/outdoors-294.png";
import pioneer from "../assets/images/maps/pioneer-294.png";
import spinalMap from "../assets/images/maps/spinal-map-294.png";
import transport from "../assets/images/maps/transport-294.png";
import transportDark from "../assets/images/maps/transport-dark-294.png";
import { useSettings } from "./SettingsContext";

const mapStyles = [
  { label: "Cycle", url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img: cycle },
  { label: "Transport", url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : transport },
  { label: "Landscape", url: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : landscape },
  { label: "Outdoors", url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : outdoors },
  { label: "Transport Dark", url: "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : transportDark },
  { label: "Spinal Map", url: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : spinalMap },
  { label: "Pioneer", url: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197" , img : pioneer},
  { label: "Mobile Atlas", url: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197" , img : mobileAtlas},
  { label: "Neighbourhood", url: "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197", img : neighbourhood },
  { label: "Atlas", url: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1fa9012ce2364b9db0a3509409760197",  img : altas},
];

interface SettingsPanelProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isVisible, setIsVisible }) => {
  const [tab, setTab] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [dayNight, setDayNight] = useState(true);
  const {setUrlMap} = useSettings();

  return (
    <>
      {/* Panneau des paramètres */}
      {isVisible && (
        <Box
          sx={{
            width: 320,
            backgroundColor: "#333",
            color: "white",
            borderRadius: "10px",
            position: "absolute",
            top: 40,
            left: 40,
            zIndex: 99999,
            p: 2,
          }}
        >
          {/* Bouton "X" pour fermer */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Settings</Typography>
            <IconButton
              onClick={() => {
                setIsVisible(false);
                console.log("Settings panel closed");
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Onglets */}
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} textColor="inherit">
            <Tab label="Map" />
            <Tab label="Visibility" />
            <Tab label="Misc" />
          </Tabs>

          {/* Onglet MAP */}
          {tab === 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                MAP STYLE
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
                {mapStyles.map((style, index) => (
                  <Card key={index} sx={{ borderRadius: "8px" }} onClick={() => {
                    setUrlMap(style.url);
                    console.log("Map style changed to", style.label);
                  }}>
                    <CardActionArea>
                      <CardMedia component="img" height="60" image={style.img} />
                      <Typography variant="caption" align="center">
                        {style.label}
                      </Typography>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              {/* Luminosité */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Brightness
              </Typography>
              <Slider
                value={brightness}
                onChange={(_, newValue) => setBrightness(newValue as number)}
                sx={{ color: "yellow" }}
              />

              {/* Ligne jour/nuit */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                DAY/NIGHT LINE
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: dayNight ? "yellow" : "gray" }}
                onClick={() => setDayNight(!dayNight)}
              >
                {dayNight ? "On" : "Off"}
              </Button>
            </>
          )}

          {/* Onglet VISIBILITY */}
          {tab === 1 && (
            <>
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "gray" }}>
                DATA SOURCES
              </Typography>

              <FormControlLabel control={<Switch color="secondary" />} label="ADS-B (LIVE)" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Space Based ADS-B (LIVE)" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="MLAT (LIVE)" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="US/Canada Radar (LIVE)" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Australia Radar (LIVE)" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Spidertracks (LIVE)" />
            </>
          )}

          {/* Onglet MISC */}
          {tab === 2 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                UNITS
              </Typography>

              {/* Time Zone */}
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                TIME ZONE
              </Typography>
              <Button variant="contained" color="warning">
                Local time
              </Button>
              <Button variant="outlined" color="warning">
                UTC
              </Button>

              {/* Temperature */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                TEMPERATURE
              </Typography>
              <Button variant="contained" color="warning">
                Celsius °C
              </Button>
              <Button variant="outlined" color="warning">
                Fahrenheit °F
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default SettingsPanel;
