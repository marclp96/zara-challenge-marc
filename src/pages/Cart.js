import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Marca: {item.brand}</p>
                <p>Color: {item.color}</p>
                <p>Almacenamiento: {item.storage}</p>
                <p>Precio: {item.price}€</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="remove-button"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>Total: {totalPrice}€</h3>
      </div>
      <div className="continue-shopping">
        <Link to="/" className="continue-button">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default Cart;