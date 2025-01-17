import { Link } from "react-router-dom"; // Import the Link component from the react-router-dom library to create navigation links within the application.
import styles from "./Css_Modules/Homepage.module.css"; // Import the CSS module for styling the Homepage component.
import PageNav from "../components/PageNav"; // Import the PageNav component, which is a navigation bar for the page.

/**
 * The Homepage component is a functional React component.
 * Functional components are a simpler way to write components that only contain a render method and don't have their own state.
 */
export default function Homepage() {
  // The return statement contains the JSX that defines the component's UI.
  return (
    // The main HTML element is styled with the 'homepage' class from the CSS module.
    <main className={styles.homepage}>
      {/* Render the PageNav component to display the navigation bar at the top of the page. */}
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {/* The Link component is used to navigate to the login page. It behaves like an anchor tag but uses client-side routing. */}
        <Link to="/login" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
