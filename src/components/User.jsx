import { useNavigate } from "react-router-dom"; // import the useNavigate hook from react-router-dom, which allows us to programmatically navigate to different routes in our application
import { useAuth } from "../Contexts/FakeAuthContext"; // import the useAuth hook from the FakeAuthContext, which provides us with the current user and a function to log out
import styles from "./Css_Modules/User.module.css"; // import the CSS styles for this component

function User() {
  const { user, logout } = useAuth(); // use the useAuth hook to get the current user and the logout function
  const navigate = useNavigate(); // use the useNavigate hook to get a function to navigate to different routes

  function handleClick() {
    logout(); // call the logout function to log the user out
    navigate("/"); // navigate to the root route after logging out
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />{" "}
      {/* display the user's avatar */}
      <span>Welcome, {user.name}</span>{" "}
      {/* display a welcome message with the user's name */}
      <button onClick={handleClick}>Logout</button>{" "}
      {/* display a logout button, which calls the handleClick function when clicked */}
    </div>
  );
}

export default User;
