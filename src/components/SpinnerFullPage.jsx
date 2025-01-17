import Spinner from "./Spinner"; // Import the Spinner component from the same directory
import styles from "./Css_Modules/SpinnerFullPage.module.css"; // Import the CSS styles for the SpinnerFullPage component

// The SpinnerFullPage component is a wrapper component that displays a Spinner component
// taking up the entire page. It is used to indicate that some content is still being loaded.
function SpinnerFullPage() {
  // The SpinnerFullPage component simply renders a Spinner component inside a div
  // with the class spinnerFullpage. This div takes up the entire page.
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

// Export the SpinnerFullPage component as the default export from this module.
export default SpinnerFullPage;
