import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Profile from "./components/Authentication/Profile";
import SingleProduct from "./pages/ProductView/SingleProduct";
import ShopContextProvider from "./context/ShopContext";
import { CartProvider } from "./context/cartContext";
import FirebaseCourse from "./pages/FirebaseCourse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import { UsersDbProvider } from "./context/usersDbContext";

const App = () => {
  return (
    <UsersDbProvider>
      <ShopContextProvider>
        <CartProvider>
          <Container className="mb-4 mt-4">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product-view/:id" element={<SingleProduct />} />
              <Route path="/firebasecourse" element={<FirebaseCourse />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Container>
        </CartProvider>
        <ToastContainer />
      </ShopContextProvider>
    </UsersDbProvider>
  );
};

export default App;
