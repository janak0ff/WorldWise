// Import the necessary components and hooks from the react-leaflet library to render a map
// and its associated components (markers, popups, etc.)
import {
  MapContainer, // The main container for the map
  TileLayer, // The base layer of the map
  Marker, // A single point of interest on the map
  Popup, // A pop-up window that displays information about a marker
  useMap, // A hook that provides access to the map object
  useMapEvents, // A hook that allows you to bind events to the map
} from "react-leaflet";

// Import the CSS styles for the map
import styles from "./Css_Modules/Map.module.css";

// Import the necessary React hooks
import { useEffect, useState } from "react";

// Import the useCities hook to get the list of cities from the CititesContext
import { useCities } from "../Contexts/CititesContext";

// Import the useGeolocation hook to get the user's current location
import { useGeolocation } from "../hooks/useGeolocation";

// Import the Button component to render a button
import Button from "./Button";

// Import the useUrlPosition hook to get the map's position from the URL's query string
import { useUrlPosition } from "../hooks/useUrlPosition";
// Import the useNavigate hook from react-router-dom, which is a library for routing in React applications.
// The useNavigate hook allows you to programmatically navigate to different routes in your application.
// It returns a function that can be called with a path to navigate to that route.
import { useNavigate } from "react-router-dom";

// The Map component renders a map and marks the cities that the user has saved.
// It also allows the user to click on the map to open the form to add a new city.
function Map() {
  // Get the cities from the context
  const { cities } = useCities();

  // The map's position is stored in the state
  const [mapPosition, setMapPosition] = useState([27.7172, 85.324]);

  // Get the user's geolocation
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // Get the position from the URL query string
  const [mapLat, mapLng] = useUrlPosition();

  // If the URL query string has a position, set the map's position to it
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // If the user's geolocation is available, set the map's position to it
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {/* If the user's geolocation is not available, show a button to get it */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      {/* The MapContainer component renders the map */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        {/* The TileLayer component renders the map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* Render a Marker component for each city */}
        {cities.map((city) => (
          <Marker
            // The position prop is an array of the city's latitude and longitude
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            {/* The Popup component renders a popup with the city's emoji and name */}
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* The ChangeCenter component sets the map's center to the mapPosition state */}
        <ChangeCenter position={mapPosition} />
        {/* The DetectClick component detects when the user clicks on the map */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// The ChangeCenter component sets the map's center to the given position
function ChangeCenter({ position }) {
  const map = useMap();
  // Set the map's center to the given position
  map.setView(position);
  // Return null because this component does not render anything
  return null;
}

// The DetectClick component detects when the user clicks on the map
function DetectClick() {
  const navigate = useNavigate();

  // Use the useMapEvents hook to detect when the user clicks on the map
  useMapEvents({
    click: (e) => {
      // Navigate to the form page with the clicked position as query string
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
