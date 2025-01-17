import { useSearchParams } from "react-router-dom";

/**
 * A custom hook that extracts latitude and longitude coordinates from the current URL's query string.
 *
 * @returns An array containing the latitude and longitude coordinates, or undefined if either is not present.
 */
export function useUrlPosition() {
  // Get the current URL's query string parameters
  const [searchParams] = useSearchParams();

  // Extract the latitude and longitude parameters from the query string
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Return the coordinates as an array. If either is not present, the value will be undefined.
  return [lat, lng];
}
