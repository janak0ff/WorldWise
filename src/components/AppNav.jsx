import { NavLink } from "react-router-dom";
import styles from "./Css_Modules/AppNav.module.css";

// AppNav is a React functional component that renders a navigation menu.
// It uses the NavLink component from react-router-dom to create links to other pages.
function AppNav() {
  // The JSX code for the navigation menu is returned from the AppNav function.
  // The outer nav element is given the class name "nav" which is defined in AppNav.module.css.
  // The inner ul element contains two li elements, each of which contains a NavLink.
  // The first NavLink points to the "cities" page, and the second points to the "countries" page.
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* // The NavLink component is given a "to" prop that specifies the path to which it should link.
          // In this case, the path is "cities", which is the name of the route defined in App.jsx.
          // The NavLink component is also given a children prop, which specifies the text to be displayed as the link. */}
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

// The AppNav component is exported as the default export from this module.
export default AppNav;
