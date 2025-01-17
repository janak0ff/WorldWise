// CountryList is a React component that displays a list of unique countries
// from the cities in the CititesContext

import Spinner from "./Spinner";
import styles from "./Css_Modules/CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CititesContext";

// The CountryList component uses the useCities hook to get the cities
// from the CititesContext
function CountryList() {
  const { cities, isLoading } = useCities();

  // If the cities are still loading, display a Spinner component
  if (isLoading) return <Spinner />;

  // If there are no cities, display a Message component with a message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // Create an array of unique countries by using the reduce method
  // The initial value of the accumulator is an empty array
  // We use the map method to get an array of countries
  // We use the includes method to check if the country already exists in the array
  // If it doesn't exist, we add it to the array
  // The final value of the accumulator is the array of unique countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  // Return a ul element with the class countryList
  // The ul element contains a list of CountryItem components
  // Each CountryItem component is passed a country object as a prop
  // The country object contains the country name and emoji
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
