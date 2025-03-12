import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-home">
        <b>INICIO</b>
      </Link>
      <Link to="/cart" className="nav-cart">
        <b>CARRITO</b> <span className="cart-count">({cart.length})</span>
      </Link>
    </nav>
  );
};

export default Navbar;