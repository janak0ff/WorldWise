import { createContext, useContext, useReducer } from "react";

// Create a React context for authentication
const AuthContext = createContext();

// Define the initial state for the reducer
const initialState = {
  // The user object is initially null
  user: null,
  // The user is initially not authenticated
  isAuthenticated: false,
};

// Define a reducer function to handle authentication actions
function reducer(state, action) {
  // Handle login action
  switch (action.type) {
    case "login":
      // Return a new state with the user object and isAuthenticated set to true
      return { ...state, user: action.payload, isAuthenticated: true };
    // Handle logout action
    case "logout":
      // Return a new state with the user object set to null and isAuthenticated set to false
      return { ...state, user: null, isAuthenticated: false };
    // If the action type is unknown, throw an error
    default:
      throw new Error("Unknown action");
  }
}

// Define a fake user object for testing purposes
const FAKE_USER = {
  // The user's name
  name: "janak",
  // The user's email
  email: "janak@shrestha.com",
  // The user's password
  password: "janak",
  // The user's avatar URL
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Define the AuthProvider component
function AuthProvider({ children }) {
  // Use the useReducer hook to create a reducer state and dispatch function
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Define a login function that takes an email and password as arguments
  function login(email, password) {
    // If the email and password match the fake user's credentials, dispatch a login action
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  // Define a logout function that dispatches a logout action
  function logout() {
    dispatch({ type: "logout" });
  }

  // Return a context provider with the authentication state and functions
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Define a useAuth hook to access the authentication context
function useAuth() {
  // Use the useContext hook to access the authentication context
  const context = useContext(AuthContext);
  // If the context is undefined, throw an error
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  // Return the authentication context
  return context;
}

// Export the AuthProvider component and the useAuth hook
export { AuthProvider, useAuth };
