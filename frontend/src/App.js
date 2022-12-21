import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { Nav, Foot } from "./components";
import { StateContext } from "./context/context";
import { AllUsers, Home, Login, Register } from "./pages";
import Blog from "./pages/Blog";
import Category from "./pages/Category/Category";
import CategoryDetails from "./pages/Category/CategoryDetails";
import AddProduct from "./pages/Dashboard/AddProduct";
import AllProducts from "./pages/Dashboard/AllProducts";
import AllSellers from "./pages/Dashboard/AllSellers";
import DashBoardHome from "./pages/Dashboard/DashBoardHome";
import MyOrder from "./pages/Dashboard/MyOrder";
import MyProducts from "./pages/Dashboard/MyProducts";
import MyWishList from "./pages/Dashboard/MyWishList";
import ReportedProducts from "./pages/Dashboard/ReportedProducts";
import ErrorPage from "./pages/ErrorPage";
import Payment from "./pages/Payment/Payment";
import ProductDetail from "./pages/ProductDetail";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(StateContext);

  const location = useLocation();
  const auth = user?.uid;
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <SpinnerCircularFixed
          size={78}
          thickness={100}
          speed={130}
          color="rgba(172, 57, 57, 1)"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </div>
    );
  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(StateContext);

  const location = useLocation();
  const auth = user && role === "admin";
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <SpinnerCircularFixed
          size={78}
          thickness={100}
          speed={130}
          color="rgba(172, 57, 57, 1)"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </div>
    );
  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const SellerRoute = ({ children }) => {
  const { user, role, loading } = useContext(StateContext);

  const location = useLocation();
  const auth = user?.uid && role === "seller";
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <SpinnerCircularFixed
          size={78}
          thickness={100}
          speed={130}
          color="rgba(172, 57, 57, 1)"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </div>
    );
  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <div className="bg-[#F8F4F1] w-full sm:w-10/12 mx-auto ">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/categories" element={<Category />} />
        <Route path="/categories/:categoryId" element={<CategoryDetails />} />

        <Route
          path="/dashboard-home"
          element={
            <PrivateRoute>
              <DashBoardHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/:bookingId"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-wishlist"
          element={
            <PrivateRoute>
              <MyWishList />
            </PrivateRoute>
          }
        />
        <Route path="/all-products" element={<AllProducts />} />

        {/* seller route */}
        <Route
          path="/my-products"
          element={
            <SellerRoute>
              <MyProducts />
            </SellerRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          }
        />

        {/* admin Route */}
        <Route
          path="/all-sellers"
          element={
            <AdminRoute>
              <AllSellers />
            </AdminRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/report-products"
          element={
            <AdminRoute>
              <ReportedProducts />
            </AdminRoute>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Foot />
    </div>
  );
}

export default App;
