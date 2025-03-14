import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext, CartProvider } from '../context/CartContext';

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <button onClick={() => addToCart({ id: 1, name: 'Item 1' })}>
        Add Item
      </button>
      <button onClick={() => removeFromCart(0)}>Remove First</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('inicializa con un carrito vacío si localStorage está vacío', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const cartLength = screen.getByTestId('cart-length');
    expect(cartLength.textContent).toBe('0');
  });

  test('agrega un ítem al carrito y actualiza localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    const cartLength = screen.getByTestId('cart-length');
    expect(cartLength.textContent).toBe('1');

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    expect(storedCart.length).toBe(1);
    expect(storedCart[0]).toEqual({ id: 1, name: 'Item 1' });
  });

  test('elimina el primer ítem del carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    const removeButton = screen.getByText('Remove First');

    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('1');

    fireEvent.click(removeButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  test('limpia el carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    const clearButton = screen.getByText('Clear Cart');

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('2');

    fireEvent.click(clearButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });
});
