import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { CartProvider } from '../context/CartContext';

test('renders Navbar home link with aria-label "Inicio"', async () => {
  render(
    <CartProvider>
      <App />
    </CartProvider>
  );
  const homeLink = await screen.findByRole('link', { name: /Inicio/i });
  expect(homeLink).toBeInTheDocument();
});
