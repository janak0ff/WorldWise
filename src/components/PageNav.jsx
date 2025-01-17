import { NavLink } from "react-router-dom"; // Import the NavLink component from the react-router-dom library for client-side routing
import styles from "./Css_Modules/PageNav.module.css"; // Import the CSS styles for the PageNav component
import Logo from "./Logo"; // Import the Logo component from the same directory

/**
 * The PageNav component renders a navigation bar at the top of the page.
 * The navigation bar contains links to the pricing, product, and login pages.
 * The component also renders the Logo component.
 */
function PageNav() {
  return (
    /**
     * The nav element is given the class name "nav" which is defined in the PageNav.module.css file.
     * The nav element contains a Logo component and an unordered list (ul) with three list items (li).
     * Each list item contains a NavLink component with a to prop set to the path of the page it links to.
     */
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
