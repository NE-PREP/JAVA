import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { PrivateAdminRoute, PrivateUserRoute, PublicRoute } from "./utils/Route";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ShoppingCartProvider } from "./contexts";
import { Products } from "./pages/Products";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" exact element={<PublicRoute element={Login} />} />
            <Route
              path="/login"
              exact
              element={<PublicRoute element={Login} />}
            />
            <Route
              path="/register"
              exact
              element={<PublicRoute element={Register} />}
            />
            <Route
              path="/dashboard"
              exact
              element={<PrivateAdminRoute element={Dashboard} />}
            />
            <Route
              path="/products"
              exact
              element={<PrivateUserRoute element={Products} />}
            />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
