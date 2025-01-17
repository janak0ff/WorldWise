import { Link } from "react-router-dom"; // Import the Link component from React Router to create an anchor tag that can be used to navigate to a different route
import styles from "./Css_Modules/Logo.module.css"; // Import the CSS styles for the Logo component

// Define the Logo component as a function component
function Logo() {
  // Return a JSX element that represents the component
  return (
    // Use the Link component to create an anchor tag that can be used to navigate to the root route (i.e. "/")
    <Link to="/">
      {/* // Use the img tag to display the logo image */}
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo; // Export the Logo component as the default export of the module
