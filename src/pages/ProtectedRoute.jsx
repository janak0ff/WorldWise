/**
 * The ProtectedRoute component is a higher-order component (HOC) that wraps a given component
 * and restricts access to only authenticated users. If the user is not authenticated, the
 * component will redirect the user to the login page.
 *
 * @param {React.ReactNode} children - The component to be wrapped and protected.
 * @returns {React.ReactNode} - The wrapped component if the user is authenticated, or null if not.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  // Get the authentication state and the navigate function from the useAuth hook.
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Use the useEffect hook to run a function when the component mounts or updates.
  // The function will check if the user is authenticated, and if not, redirect the user
  // to the login page using the navigate function.
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    // The dependency array is set to [isAuthenticated, navigate] which means the effect
    // will only run when either isAuthenticated or navigate changes.
    [isAuthenticated, navigate]
  );

  // Return the wrapped component if the user is authenticated, or null if not.
  return isAuthenticated ? children : null;
}

// Export the ProtectedRoute component as the default export.
export default ProtectedRoute;
