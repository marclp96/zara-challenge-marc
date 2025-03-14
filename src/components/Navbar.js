import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  return (
    <nav className="navbar">
      <Link to="/" className="nav-home" aria-label="Inicio">
        <i className="fa-solid fa-house"></i>
      </Link>
      <Link to="/cart" className="nav-cart">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="cart-count">({cart.length})</span>
      </Link>
    </nav>
  );
};

export default Navbar;