import styles from "./Css_Modules/Message.module.css";

// The Message component is a React functional component that takes
// a single prop, 'message', which is a string. It renders a paragraph
// element with a class of 'message' and displays the message passed
// in, prefixed with an emoji of a waving hand.
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

// The Message component is exported as the default export
// from this module.
export default Message;
