import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './Home/Home';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import ForgotPassword from './components/Auth/ForgotPassword';
import AircraftList from './Aircrafts/AircraftList';


// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot_password" element={<ForgotPassword/>} />
        <Route path="/Aircrafts" element={<AircraftList/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
