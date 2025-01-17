// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0
// This component is responsible for rendering a form to input data about a city
// that the user has clicked on the map. It uses the useUrlPosition hook to get the
// latitude and longitude of the city from the URL's query string. It uses the
// useCities hook to get the createCity function to save the city to the database.
// It uses the useState hook to store the city name, country, emoji, date, and notes
// input fields in the state. It uses the useEffect hook to fetch the city data
// from the BigDataCloud API when the component mounts. It uses the Datepicker
// component from the react-datepicker package to render a date picker for the
// user to input the date of their trip to the city. It also renders a Spinner
// component while the city data is being fetched, and a Message component if
// there is an error with the API request.

import { useEffect, useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import styles from "./Css_Modules/Form.module.css";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/CititesContext";
import { useNavigate } from "react-router-dom";

// This function converts a country code to an emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  // Get the createCity function from the useCities hook
  const { createCity, isLoading } = useCities();
  // Initialize the isLoadingGeocoding state to false
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  // Get the latitude and longitude from the URL's query string
  const [lat, lng] = useUrlPosition();
  // Initialize the city name, country, emoji, date, and notes state to empty
  // strings
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  // Initialize the geocoding error state to an empty string
  const [geocodingError, setGeocodingError] = useState("");
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // This useEffect hook is used to fetch the city data from the API when the
  // component mounts
  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        // Set the isLoadingGeocoding state to true
        setIsLoadingGeocoding(true);
        // Set the geocoding error state to an empty string
        setGeocodingError("");
        // Fetch the city data from the API
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        // Get the JSON data from the response
        const data = await res.json();
        // Set the city name, country, emoji, and date state to the data from the
        // API
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        // If there is an error with the API request, set the geocoding error state
        // to the error message
        setGeocodingError(err.message);
      } finally {
        // Set the isLoadingGeocoding state to false
        setIsLoadingGeocoding(false);
      }
    }
    // Call the fetchCityData function
    fetchCityData();
  }, [lat, lng]);

  // This function is called when the form is submitted
  async function handleSubmit(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // If the city name or date is empty, return
    if (!cityName || !date) return;

    // Create a new city object with the input fields
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // Call the createCity function with the new city object
    await createCity(newCity);
    // Navigate to the cities page
    navigate("/app/cities");
  }

  // If the user is still loading the city data, render a Spinner component
  if (isLoadingGeocoding) return <Spinner />;
  // If the user has not clicked on a city on the map, render a Message component
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  // If there is an error with the API request, render a Message component with
  // the error message
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        {/* This is a date picker component from the react-datepicker package */}

        <Datepicker
          onChange={(date) => setDate(date)}
          selected={date}
          id="date"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
