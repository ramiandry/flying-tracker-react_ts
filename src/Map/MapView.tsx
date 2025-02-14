import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importez le CSS de Leaflet
import airplane_icon from "../assets/avion.png"
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { useSettings } from "../components/SettingsContext"; // Import du contexte

// Icône d'avion personnalisée avec rotation
const createAirplaneIcon = (angle: number) => {
  return L.divIcon({
    className: 'airplane-icon', // Classe CSS pour styliser l'icône
    html: `<img src=${airplane_icon} style="transform: rotate(${angle}deg); width: 32px; height: 32px;" />`, // Appliquez la rotation ici
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 16], // Point d'ancrage de l'icône
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
  true_track: number; // Angle de cap (direction de l'avion)
}

const MapView: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { urlMap } = useSettings(); // Récupérez l'URL de la carte à partir du contexte

  const fetchFlights = async () => {
    try {
      const response = await axios.get('https://opensky-network.org/api/states/all');
      const data = response.data;
      const states = data.states
        .map((state: any[]) => ({
          icao24: state[0],
          callsign: state[1],
          origin_country: state[2],
          longitude: state[5],
          latitude: state[6],
          baro_altitude: state[7],
          velocity: state[9],
          true_track: state[10], // Récupérez l'angle de cap
        }))
        .filter((flight: Flight) => flight.latitude !== null && flight.longitude !== null); // Filtrez les vols avec des positions valides
      setFlights(states);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchFlights();

    // Set up the interval to fetch data every 6 seconds
    const intervalId = setInterval(fetchFlights, 6000);

    // Clear the interval on component unmount
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
    <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={urlMap} // Utilisez l'URL de la carte à partir du contexte
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {flights.map((flight) => (
        <Marker
          key={flight.icao24}
          position={[flight.latitude, flight.longitude]}
          icon={createAirplaneIcon(flight.true_track)} // Appliquez la rotation ici
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
