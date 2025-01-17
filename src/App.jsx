import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Import CitiesProvider and AuthProvider context components
import { CitiesProvider } from "./Contexts/CititesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// Import CityList, Form, City, CountryList, and SpinnerFullPage components
import CityList from "./components/CityList";
import Form from "./components/Form";
import City from "./components/City";
import CountryList from "./components/CountriyList";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Use lazy loading to load Homepage, Product, Pricing, AppLayout, and PageNotFound components on demand
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));

// Define App component
function App() {
  return (
    <div>
      {/* Use AuthProvider to wrap all routes with authentication */}
      <AuthProvider>
        {/* Use CitiesProvider to wrap all routes with cities context */}
        <CitiesProvider>
          {/* Use BrowserRouter to enable client-side routing */}
          <BrowserRouter>
            {/* Use Suspense to handle lazy-loaded components */}
            <Suspense fallback={<SpinnerFullPage />}>
              {/* Define routes using Routes component */}
              <Routes>
                {/* Define route for homepage */}
                <Route index element={<Homepage />} />
                {/* Define route for product page */}
                <Route path="product" element={<Product />} />
                {/* Define route for pricing page */}
                <Route path="pricing" element={<Pricing />} />
                {/* Define route for login page */}
                <Route path="login" element={<Login />} />
                {/* Define route for app layout */}
                <Route
                  path="app"
                  element={
                    // Use ProtectedRoute to protect app layout route
                    <ProtectedRoute>
                      {/* Use AppLayout component for app layout route */}
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Define route for cities page */}
                  <Route index element={<Navigate to="cities" />} />
                  {/* Define route for city list page */}
                  <Route path="cities" element={<CityList />} />
                  {/* Define route for city page */}
                  <Route path="cities/:id" element={<City />} />
                  {/* Define route for countries page */}
                  <Route path="countries" element={<CountryList />} />
                  {/* Define route for form page */}
                  <Route path="form" element={<Form />} />
                </Route>
                {/* Define route for page not found */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

// Export App component
export default App;
