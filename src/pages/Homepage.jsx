import { Link } from "react-router-dom";
import NavPage from "../components/NavPage";
import NavApp from "../components/NavApp";

function Homepage() {
  return (
    <div>
      <NavPage />
      <h1>WroldWise</h1>
      <NavApp />

      <Link to="/app">Go To Home Page</Link>
    </div>
  );
}

export default Homepage;
