// CityList is a React component that displays a list of cities.
// It uses the useCities hook from the CititesContext to get the list of cities and
// the isLoading state.
import Spinner from "./Spinner";
import styles from "./Css_Modules/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../Contexts/CititesContext";

function CityList() {
  // Get the cities and isLoading state from the CititesContext
  const { cities, isLoading } = useCities();

  // If the data is still loading, display a spinner
  if (isLoading) return <Spinner />;

  // If there are no cities, display a message
  if (!cities.length)
    return (
      // The Message component takes a message prop and displays it as a paragraph
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // If there are cities, display them in a list
  return (
    // The CityList component is a ul element with a class of cityList
    <ul className={styles.cityList}>
      {
        // Map over the cities array and render a CityItem component for each city
        cities.map((city) => (
          // The CityItem component takes a city prop and renders a list item
          // with the city's name and a delete button
          <CityItem city={city} key={city.id} />
        ))
      }
    </ul>
  );
}

// Export the CityList component as the default export
export default CityList;
