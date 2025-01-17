import { Link } from "react-router-dom"; // Import the Link component from react-router-dom to create a clickable link to the city's details page
import styles from "./Css_Modules/CityItem.module.css"; // Import the CSS styles for the CityItem component
import { useCities } from "../Contexts/CititesContext"; // Import the useCities hook from the CititesContext to get the current city and delete a city

/**
 * Format a date string into a human-readable format using the Intl.DateTimeFormat API.
 * @param {string} date - The date string to format
 * @returns {string} The formatted date string
 */
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric", // Show the day of the month as a number
    month: "long", // Show the month as its full name
    year: "numeric", // Show the year as a number
    // weekday: "long", // Show the day of the week as its full name
  }).format(new Date(date)); // Create a new Date object from the date string and format it using the Intl.DateTimeFormat API

/**
 * A React component that displays a city's details as a list item.
 * @param {object} city - The city object to display
 * @returns {JSX.Element} The CityItem component
 */
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities(); // Get the current city and deleteCity function from the useCities hook
  const { cityName, emoji, date, id, position } = city; // Destructure the city object into its individual properties

  /**
   * Handle the click event on the delete button.
   * @param {Event} e - The event object
   */
  function handleClick(e) {
    e.preventDefault(); // Prevent the default link behavior
    deleteCity(id); // Call the deleteCity function with the city's ID
  }

  return (
    <li>
      {/* Create a link to the city's details page with the city's ID and coordinates as query parameters */}
      <Link
        className={
          // Add the "cityItem--active" class if the current city's ID matches the city's ID
          `${styles.cityItem} ${
            id === currentCity.id ? styles["cityItem--active"] : ""
          }`
        }
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Display the city's emoji, name, and date as a list item */}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        {/* Display the delete button with an event handler to delete the city when clicked */}
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem; // Export the CityItem component as the default export
