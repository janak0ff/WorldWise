// Import necessary hooks and components from React and other libraries
import { useEffect, useState } from "react"; // useEffect and useState are React hooks used for managing side effects and state in functional components
import styles from "./Css_Modules/Login.module.css"; // Import CSS module for styling the Login component
import PageNav from "../components/PageNav"; // Import PageNav component for rendering the navigation bar
import Button from "../components/Button"; // Import Button component for rendering buttons
import { useAuth } from "../Contexts/FakeAuthContext"; // useAuth is a custom hook for authentication context
import { useNavigate } from "react-router-dom"; // useNavigate is a hook from react-router-dom for programmatic navigation

// Define and export the Login component as a default export
export default function Login() {
  // useState hooks to manage state for email and password inputs
  const [email, setEmail] = useState("janak@shrestha.com"); // Initialize email state with default value
  const [password, setPassword] = useState("janak"); // Initialize password state with default value

  // Destructure login function and isAuthenticated state from the authentication context
  const { login, isAuthenticated } = useAuth();
  // Initialize navigate function from useNavigate hook for redirecting users
  const navigate = useNavigate();

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Call login function if email and password are provided
    if (email && password) login(email, password);
  }

  // useEffect hook to perform side effects; runs after every render
  useEffect(
    function () {
      // Navigate to the "/app" route if user is authenticated
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate] // Dependencies array; effect runs when these values change
  );

  // JSX code to render the Login component
  return (
    <main className={styles.login}>
      {" "}
      {/* Apply CSS class for styling */}
      <PageNav /> {/* Render navigation bar */}
      {/* Render form with email and password inputs */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            value={email} // Controlled component, value tied to state
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            value={password} // Controlled component, value tied to state
          />
        </div>

        <div>
          <Button type="primary">Login</Button> {/* Render login button */}
        </div>
      </form>
    </main>
  );
}
