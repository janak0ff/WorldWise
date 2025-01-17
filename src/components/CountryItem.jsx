// Import the CSS module for styling the component
import styles from "./Css_Modules/CountryItem.module.css";

/**
 * CountryItem is a React functional component.
 * It is designed to display a country's emoji and name within a list item.
 * @param {object} props - The props object containing component properties.
 * @param {object} props.country - The country object to display.
 * @returns {JSX.Element} The JSX to render the CountryItem component.
 */
function CountryItem({ country }) {
  // Render the component's JSX structure
  return (
    // Use the class from the imported CSS module to style the list item
    <li className={styles.countryItem}>
      {/* Display the country's emoji */}
      <span>{country.emoji}</span>
      {/* Display the country's name */}
      <span>{country.country}</span>
    </li>
  );
}

// Export the CountryItem component as the default export.
// This allows the component to be imported with any name in other files.
export default CountryItem;
