import { useParams } from "react-router-dom"; // Import the useParams hook from React Router to get the current route's parameters
import styles from "./Css_Modules/City.module.css"; // Import the CSS styles for this component
import { useCities } from "../Contexts/CititesContext"; // Import the useCities hook from the CititesContext to get the cities state and functions
import { useEffect } from "react"; // Import the useEffect hook from React to run a function when the component mounts or updates
import Spinner from "./Spinner"; // Import the Spinner component to display a loading animation while the data is being fetched
import BackButton from "./BackButton"; // Import the BackButton component to navigate back to the previous page

const formatDate = (
  date // Define a function to format a date
) =>
  new Intl.DateTimeFormat("en", {
    // Use the built-in Intl.DateTimeFormat API to format the date
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long", // Include the weekday in the formatted date
  }).format(new Date(date)); // Return the formatted date as a string

function City() {
  // Define the City component
  const { id } = useParams(); // Get the current route's parameters using the useParams hook
  const { getCity, currentCity, isLoading } = useCities(); // Get the current city's data and the loading state using the useCities hook

  useEffect(
    // Run a function when the component mounts or updates
    function () {
      // Define the function to run
      getCity(id); // Call the getCity function with the current city's ID to fetch its data
    },
    [id, getCity] // Run the function when the city's ID or the getCity function changes
  );

  const { cityName, emoji, date, notes } = currentCity; // Destructure the current city's data

  if (isLoading) return <Spinner />; // If the data is being fetched, display the loading animation

  return (
    // Return the component's JSX
    <div className={styles.city}>
      {/* // Wrap the component's content in a div with the CSS class "city" */}
      <div className={styles.row}>
        {/* // Wrap each row in a div with the CSS class "row" */}
        <h6>City name</h6>
        {/* // Display the city name with an h6 heading */}
        <h3>
          {/* // Display the city name with an h3 heading */}
          <span>{emoji}</span> {cityName}
          {/* // Display the emoji and city name inside the h3 heading */}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {/* // Display the date with an h6 heading */}
        <p>{formatDate(date || null)}</p>
        {/* // Display the formatted date with a p element */}
      </div>

      {notes && ( // If the current city has notes, display them
        <div className={styles.row}>
          <h6>Your notes</h6>
          {/* // Display the notes with an h6 heading */}
          <p>{notes}</p>
          {/* // Display the notes with a p element */}
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        {/* // Display the link with an h6 heading */}
        <a // Create an anchor element
          href={`https://en.wikipedia.org/wiki/${cityName}`} // Set the href attribute to the Wikipedia URL
          target="_blank" // Open the link in a new tab
          rel="noreferrer" // Prevent the link from being opened in the same tab
        >
          Check out {cityName} on Wikipedia &rarr;
          {/* // Display the link with a right arrow */}
        </a>
      </div>

      <div>
        {/* Display the BackButton component to navigate back to the previous page */}
        <BackButton />
      </div>
    </div>
  );
}

export default City; // Export the City component as the default export
