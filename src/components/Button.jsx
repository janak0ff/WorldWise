// Import styles from the Button module's CSS file
import styles from "./Css_Modules/Button.module.css";

/**
 * A reusable Button component that can be used throughout the application.
 *
 * @param {object} props - Component props
 * @param {*} children - The content of the button
 * @param {function} onClick - The function to call when the button is clicked
 * @param {string} type - The type of button (e.g. primary, back, position)
 */
function Button({ children, onClick, type }) {
  // Use the styles class from the CSS module and add the appropriate type class
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {/* Render the provided children (e.g. text, icon, etc.) */}
      {children}
    </button>
  );
}

// Export the Button component as the default
export default Button;
