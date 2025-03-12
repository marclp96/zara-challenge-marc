import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { CartProvider } from "./context/CartContext";

test('renders Navbar link "Inicio"', async () => {
  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  const linkElement = await screen.findByText(/Inicio/i);
  expect(linkElement).toBeInTheDocument();
});
