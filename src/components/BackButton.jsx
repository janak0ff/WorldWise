import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom
import Button from "./Button"; // Import the Button component from the same directory

/**
 * The BackButton component
 *
 * This component is used to create a "back" button that, when clicked, navigates the user to the previous page
 */
function BackButton() {
  const navigate = useNavigate(); // Use the useNavigate hook to create a navigate function that can be used to navigate to a different page

  /**
   * The onClick event handler for the button
   *
   * When the button is clicked, this function is called. It prevents the default event behavior (which would be to reload the page),
   * and then calls the navigate function with the argument -1, which navigates the user to the previous page
   */
  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Button
      type="back" // The type of the button is set to "back"
      onClick={handleClick} // The onClick event handler is set to the handleClick function
    >
      &larr; Back
    </Button>
  );
}

export default BackButton; // Export the BackButton component as the default export from this module
