import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import airplane_icon from "../assets/avion.png";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useSettings } from "../components/SettingsContext";

// Icône d'avion personnalisée avec rotation
const createAirplaneIcon = (angle: number) => {
  return L.divIcon({
    className: "airplane-icon",
    html: `<img src=${airplane_icon} style="transform: rotate(${angle}deg); width: 32px; height: 32px;" />`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

interface Flight {
  icao24: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  velocity: number;
  true_track: number;
  on_ground: boolean;
}

const MapView: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { urlMap } = useSettings();

  const fetchFlights = async () => {
    try {
      const response = await axios.get("https://opensky-network.org/api/states/all");
      const data = response.data;
      const states = data.states
        .map((state: any[]) => ({
          icao24: state[0],
          callsign: state[1] || "N/A",
          origin_country: state[2],
          longitude: state[5],
          latitude: state[6],
          baro_altitude: state[7] || 0,
          velocity: state[9] || 0,
          true_track: state[10] || 0,
          on_ground: state[8],
        }))
        .filter((flight: Flight) => 
          flight.latitude !== null && flight.longitude !== null && // Exclure les valeurs nulles
          flight.on_ground === false && // 🔥 Garde uniquement les avions en vol
          flight.baro_altitude > 3000 && // 🔥 Filtre les avions volant au-dessus de 3000m
          flight.velocity > 100 // 🔥 Garde les avions à plus de 100 m/s (~360 km/h)
        );

      //setFlights(states); // 🔥 Limite à 50 avions maximum
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFlights();
    const intervalId = setInterval(fetchFlights, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url={urlMap}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {flights.map((flight) => (
        <Marker
          key={flight.icao24}
          position={[flight.latitude, flight.longitude]}
          icon={createAirplaneIcon(flight.true_track)}
        >
          <Popup>
            <div>
              <p><strong>Callsign:</strong> {flight.callsign}</p>
              <p><strong>Origin Country:</strong> {flight.origin_country}</p>
              <p><strong>Altitude:</strong> {flight.baro_altitude} m</p>
              <p><strong>Velocity:</strong> {flight.velocity} m/s</p>
              <p><strong>Direction:</strong> {flight.true_track}°</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
