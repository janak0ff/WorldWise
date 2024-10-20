import NavApp from "../components/NavApp";
import NavPage from "../components/NavPage";

function AppLayout() {
  return (
    <div>
      <NavPage />
      <p>App</p>
      <NavApp />
    </div>
  );
}

export default AppLayout;
