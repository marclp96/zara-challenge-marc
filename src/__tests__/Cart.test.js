import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../pages/Cart';

describe('Cart Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('muestra mensaje cuando el carrito está vacío', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
  });

  test('muestra items del carrito y calcula el total correctamente', () => {
    const cartItems = [
      {
        image: 'https://example.com/item1.jpg',
        name: 'Item 1',
        brand: 'Brand A',
        color: 'Red',
        storage: '64 GB',
        price: 100,
      },
      {
        image: 'https://example.com/item2.jpg',
        name: 'Item 2',
        brand: 'Brand B',
        color: 'Blue',
        storage: '128 GB',
        price: 200,
      },
    ];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText(/Marca: Brand A/i)).toBeInTheDocument();
    expect(screen.getByText(/Marca: Brand B/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 300€/i)).toBeInTheDocument();
  });

  test('elimina un item del carrito y actualiza el total', async () => {
    const cartItems = [
      {
        image: 'https://example.com/item1.jpg',
        name: 'Item 1',
        brand: 'Brand A',
        color: 'Red',
        storage: '64 GB',
        price: 100,
      },
      {
        image: 'https://example.com/item2.jpg',
        name: 'Item 2',
        brand: 'Brand B',
        color: 'Blue',
        storage: '128 GB',
        price: 200,
      },
    ];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: 300€/i)).toBeInTheDocument();

    const removeButtons = screen.getAllByText(/Eliminar/i);
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: 200€/i)).toBeInTheDocument();
  });

  test('renderiza el enlace "Seguir comprando" con la URL correcta', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /Seguir comprando/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
