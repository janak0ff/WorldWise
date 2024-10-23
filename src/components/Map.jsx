import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Css_Modules/Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParms] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Positon: {lat} , {lng}
      </h1>
      <button onClick={() => setSearchParms({ lat: 30, lng: 50 })}>
        set parms
      </button>
    </div>
  );
}

export default Map;
