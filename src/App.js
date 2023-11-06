import { useContext } from "react";
import "./App.css";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Metadata from "./pages/Metadata";
import DisplayMetadata from "./pages/DisplayMetadata";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import ClientForm from "./pages/ClientForm";
import { Nav, Topbar } from "./components/index";

//context
import { AuthContext } from "./context/auth/AuthProvider";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const { MediaContextProvider, Media } = createMedia({
    // breakpoints values can be either strings or integers
    breakpoints: {
      sm: 0,
      md: 550,
      lg: 1024,
    },
  });
  return (
    <div className="bg-light" style={{ height: "100%", width: "100vw" }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <MediaContextProvider>
          <Media at="sm">
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {isAuthenticated && <Topbar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route
                  path="/edit-product/:productId"
                  element={<EditProduct />}
                />
                  <Route path="/add-service" element={<AddService />} />
                <Route
                  path="/edit-service/:productId"
                  element={<EditService />}
                />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/subcategories" element={<SubcategoryPage />} />
                <Route path="/metadata" element={<Metadata />} />
                <Route path="/client" element={<ClientForm />} />
                <Route path="/showmetadata" element={<DisplayMetadata />} />
                <Route path="/metadata/:metadataId" element={<Metadata />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </Media>
          <Media at="md">
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              {isAuthenticated && <Nav active={false} />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route
                  path="/edit-product/:productId"
                  element={<EditProduct />}
                />
                   <Route path="/add-service" element={<AddService />} />
                <Route
                  path="/edit-service/:productId"
                  element={<EditService />}
                />
                <Route path="/services" element={<Services />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/subcategories" element={<SubcategoryPage />} />
                <Route path="/metadata" element={<Metadata />} />
                <Route path="/client" element={<ClientForm />} />
                <Route path="/showmetadata" element={<DisplayMetadata />} />
                <Route path="/metadata/:metadataId" element={<Metadata />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </Media>
          <Media greaterThanOrEqual="lg">
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              {isAuthenticated && <Nav active={true} />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route
                  path="/edit-product/:productId"
                  element={<EditProduct />}
                />
                   <Route path="/add-service" element={<AddService />} />
                <Route
                  path="/edit-service/:productId"
                  element={<EditService />}
                />
                <Route path="/services" element={<Services />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/subcategories" element={<SubcategoryPage />} />
                <Route path="/metadata" element={<Metadata />} />
                <Route path="/client" element={<ClientForm />} />
                <Route path="/showmetadata" element={<DisplayMetadata />} />
                <Route path="/metadata/:metadataId" element={<Metadata />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </Media>
        </MediaContextProvider>
      </Router>
    </div>
  );
}

export default App;
