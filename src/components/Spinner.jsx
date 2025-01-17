// Import the CSS styles for the Spinner component from the ./Css_Modules/Spinner.module.css file
import styles from "./Css_Modules/Spinner.module.css";

// Define a React functional component named Spinner
function Spinner() {
  // Return a JSX element representing the Spinner component
  return (
    // Create a div element with the class name "spinnerContainer" (defined in the ./Css_Modules/Spinner.module.css file)
    <div className={styles.spinnerContainer}>
      {/* // Create a div element with the class name "spinner" (defined in the ./Css_Modules/Spinner.module.css file) */}
      <div className={styles.spinner}>
        {/* // The div element with the class name "spinner" will display a spinner animation */}
      </div>
    </div>
  );
}

// Export the Spinner component as the default export from this module
export default Spinner;
