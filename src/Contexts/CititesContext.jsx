import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Define the base URL for our API
const BASE_URL = "http://localhost:9000";

// Create a context for our cities
const CitiesContext = createContext();

// Define the initial state for our reducer
const initialState = {
  cities: [], // An array of cities
  isLoading: false, // A boolean indicating if we are loading data
  currentCity: {}, // The current city being viewed
  error: "", // An error message if something goes wrong
};

// Define the reducer function
function reducer(state, action) {
  // Handle different actions
  switch (action.type) {
    // When loading data, set isLoading to true
    case "loading":
      return { ...state, isLoading: true };

    // When the data is loaded, set isLoading to false and update cities
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload, // The array of cities
      };

    // When a city is loaded, set isLoading to false and update currentCity
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    // When a city is created, set isLoading to false and update cities and currentCity
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload], // Add the new city to the array
        currentCity: action.payload, // Set the current city to the new city
      };

    // When a city is deleted, set isLoading to false and update cities and currentCity
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload), // Remove the city from the array
        currentCity: {}, // Reset currentCity
      };

    // When an error occurs, set isLoading to false and update error
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload, // The error message
      };

    // Handle unknown actions
    default:
      throw new Error("Unknown action type");
  }
}

// Create the CitiesProvider component
function CitiesProvider({ children }) {
  // Use the useReducer hook to create a reducer and a dispatch function
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch all cities when the component mounts
  useEffect(function () {
    async function fetchCities() {
      // Dispatch the "loading" action
      dispatch({ type: "loading" });

      try {
        // Fetch the cities from the API
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // Dispatch the "cities/loaded" action with the array of cities
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // If there is an error, dispatch the "rejected" action with an error message
        dispatch({
          type: "rejected",
          action: "Error occured in loading data",
        });
      }
    }
    fetchCities();
  }, []);

  // Create a function to get a city
  const getCity = useCallback(
    async function getCity(id) {
      // If the city is already loaded, return
      if (Number(id) === currentCity.id) return;

      // Dispatch the "loading" action
      dispatch({ type: "loading" });

      try {
        // Fetch the city from the API
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        // Dispatch the "city/loaded" action with the city
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        // If there is an error, dispatch the "rejected" action with an error message
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  // Create a function to create a city
  async function createCity(newCity) {
    // Dispatch the "loading" action
    dispatch({ type: "loading" });
    try {
      // Post the new city to the API
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // Dispatch the "city/created" action with the new city
      dispatch({ type: "city/created", payload: data });
    } catch {
      // If there is an error, dispatch the "rejected" action with an error message
      dispatch({ type: "rejected", action: "Error occured in creating city" });
    }
  }

  // Create a function to delete a city
  async function deleteCity(id) {
    // Dispatch the "loading" action
    dispatch({ type: "loading" });
    try {
      // Delete the city from the API
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // Dispatch the "city/deleted" action with the id of the city
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      // If there is an error, dispatch the "rejected" action with an error message
      dispatch({ type: "rejected", action: "Error occured in deleting city" });
    }
  }

  // Return the CitiesProvider component
  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Create the useCities hook
function useCities() {
  // Get the context
  const context = useContext(CitiesContext);
  // If the context is undefined, throw an error
  if (context === undefined)
    throw new Error("CitiesContext is used outside of CitiesProvider");
  // Return the context
  return context;
}

// Export the CitiesProvider and useCities
export { CitiesProvider, useCities };
