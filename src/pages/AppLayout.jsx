import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./Css_Modules/AppLayout.module.css";

/**
 * AppLayout is the main component of the application. It renders the Map,
 * Sidebar and User components.
 *
 * The Map component displays a map of the world, with markers indicating
 * the location of cities that the user has visited.
 *
 * The Sidebar component displays a list of all cities that the user has
 * visited, with links to each city's detail page.
 *
 * The User component displays information about the current user, such as
 * their name and profile picture.
 */
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* The Sidebar component is rendered first, so it appears on the left
       * side of the page. */}
      <Sidebar />
      {/* The Map component is rendered next, so it appears in the middle
       * of the page. */}
      <Map />
      {/* The User component is rendered last, so it appears on the right
       * side of the page. */}
      <User />
    </div>
  );
}

export default AppLayout;
