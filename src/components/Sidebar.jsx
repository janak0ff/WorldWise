// Import the Outlet component from react-router-dom for nested routing
import { Outlet } from "react-router-dom";

// Import the AppNav component, which likely contains the application's navigation menu
import AppNav from "./AppNav";

// Import the Logo component to display the application's logo
import Logo from "./Logo";

// Import CSS module styles for styling the Sidebar component
import styles from "./Css_Modules/Sidebar.module.css";

// Define the Sidebar component as a functional component in React
function Sidebar() {
  // Return the JSX structure of the Sidebar component
  return (
    // Apply the sidebar CSS class to the div element using the imported styles
    <div className={styles.sidebar}>
      {/* Render the Logo component inside the Sidebar */}
      <Logo />
      {/* Render the AppNav component inside the Sidebar */}
      <AppNav />
      {/* Render the Outlet component to display the nested routes */}
      <Outlet />

      {/* Define a footer element with a CSS class for styling */}
      <footer className={styles.footer}>
        {/* Display the copyright text with the current year dynamically generated */}
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

// Export the Sidebar component as the default export of the module
export default Sidebar;
