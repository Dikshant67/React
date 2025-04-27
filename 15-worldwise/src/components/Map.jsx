import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CityContext.jsx";
import Form from "./Form.jsx";

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([52.53586782505711, 13.376933665713324]);
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]); // ✅ Add dependencies

  return (
      <div className={styles.mapContainer} >
        <MapContainer
            className={styles.map}
            center={mapPosition} // ✅ Initial center
            zoom={13}
            scrollWheelZoom={true}
            maxZoom={18} // ✅ Prevent infinite zoom
            minZoom={3}  // ✅ Prevent too much zoom-out
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // ✅ Standard OSM tiles
          />
          {cities.map((city) => (
              <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                  <span>{city.emoji}</span>
                  <span>{city.name}</span>
                </Popup>
              </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
          <DetectClick/>
        </MapContainer>
      </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position); // ✅ Smoothly update center
  }, [position, map]);
  return null;
}
function DetectClick(){
  const navigate = useNavigate();

  useMapEvents({
    click : (e)=> {
      console.log(e.latlng.lat);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
return null;
}

export default Map;