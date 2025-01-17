/**
 * A hook that provides the current geolocation of the user.
 *
 * @param {Object} defaultPosition The default position to return if the user's
 *                                  geolocation is not available.
 *
 * @returns {Object} An object with the following properties:
 *                   - isLoading: A boolean indicating whether the geolocation
 *                                 is currently being retrieved.
 *                   - position: The current geolocation of the user, or the
 *                               default position if the user's geolocation is
 *                               not available.
 *                   - error: An error message if the user's geolocation could
 *                            not be retrieved.
 *                   - getPosition: A function that can be called to retrieve
 *                                   the user's current geolocation.
 */
export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  /**
   * A function that retrieves the user's current geolocation.
   */
  function getPosition() {
    if (!navigator.geolocation) {
      // If the browser does not support geolocation, return an error.
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Set the user's position to the retrieved position.
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        // Set an error if the user's geolocation could not be retrieved.
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
