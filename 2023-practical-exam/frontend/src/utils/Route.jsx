// Route.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/NavBar";
import { CheckoutSideMenu } from "../components/CheckoutSideMenu";

export const PrivateAdminRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    <div className="app">
      <Sidebar />{" "}
      <div className="app-content">
        <Component {...rest} />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export const PrivateUserRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    <div>
      <Layout>
        <Navbar />
        <CheckoutSideMenu />
        <Component {...rest} />
      </Layout>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Custom PublicRoute component to handle redirection
export const PublicRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Component {...rest} />
  );
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
PrivateAdminRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

PrivateUserRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
