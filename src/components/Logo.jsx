import { Link } from "react-router-dom";
import styles from "./Css_Modules/Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
