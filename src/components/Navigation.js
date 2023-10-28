import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import LOGO from "../images/yellow icon logo.png";
import { Tote, User } from "phosphor-react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config/firebase";

const Navigation = () => {
  const [authUser, setAuthUser] = useState(null);
  const { totalItems } = useCartContext();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <Navbar className="navigation justify-content-between align-items-center">
      <Nav className="links position-relative">
        <NavbarBrand>
          <img className="logo" src={LOGO} alt="" />
        </NavbarBrand>
        <NavLink to="/" className="navigationLink nav-link">
          Home
        </NavLink>
        <NavLink to="/products" className="navigationLink nav-link">
          Products
        </NavLink>
        <NavLink to="/firebasecourse" className="navigationLink nav-link">
          c
        </NavLink>
      </Nav>
      <Nav>
        {authUser ? (
          // if user already signed in, will navigate him to his profile page
          <NavLink to={"/profile"} className="navigationLink  nav-link">
            <User size={25} color="#ffffff" weight="bold" />
          </NavLink>
        ) : (
          // if user signed out, will navigate him to login page
          <NavLink to={"/login"} className="navigationLink  nav-link">
            <User size={25} color="#ffffff" weight="bold" />
          </NavLink>
        )}
        <NavLink to="/cart" className="navigationLink  nav-link">
          <Tote size={25} color="#ffffff" weight="bold" />
          <span className="cartItemsAmount">{totalItems}</span>
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
