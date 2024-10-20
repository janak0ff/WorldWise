import AppNav from "../components/AppNav";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div>
      <PageNav />
      <p>App</p>
      <AppNav />
    </div>
  );
}

export default AppLayout;
