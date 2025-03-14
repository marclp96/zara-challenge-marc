import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneDetail from '../pages/PhoneDetail';
import { CartContext } from '../context/CartContext';
import * as apiService from '../services/apiService';

jest.mock('../services/apiService');

const mockedPhoneDetail = {
  id: '1',
  name: 'iPhone 12',
  brand: 'Apple',
  description: 'El iPhone 12 es el nuevo iPhone de Apple',
  basePrice: 1000,
  colorOptions: [
    {
      name: 'Obsidiana',
      hexCode: '#000000',
      imageUrl: 'https://example.com/obsidiana.jpg',
    },
    {
      name: 'Porcelana',
      hexCode: '#F5F5F5',
      imageUrl: 'https://example.com/porcelana.jpg',
    },
    {
      name: 'Celeste',
      hexCode: '#87CEEB',
      imageUrl: 'https://example.com/celeste.jpg',
    },
  ],
  storageOptions: [
    { capacity: '64 GB', price: 1000 },
    { capacity: '128 GB', price: 1200 },
  ],
  specs: {
    screen: '6.1" OLED',
    resolution: '1170 x 2532',
    processor: 'A14',
    battery: '2815 mAh',
  },
  similarProducts: [
    {
      id: '2',
      name: 'iPhone 12 Pro',
      brand: 'Apple',
      basePrice: 1500,
      imageUrl: 'https://example.com/iphone12pro.jpg',
    },
  ],
};

const addToCartMock = jest.fn();

const renderPhoneDetail = () => {
  render(
    <CartContext.Provider value={{ cart: [], addToCart: addToCartMock }}>
      <BrowserRouter>
        <PhoneDetail />
      </BrowserRouter>
    </CartContext.Provider>
  );
};

describe('PhoneDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el loader mientras carga', async () => {
    apiService.fetchPhoneDetail.mockResolvedValue(mockedPhoneDetail);
    renderPhoneDetail();

    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Cargando/i)).not.toBeInTheDocument();
    });
  });

  test('muestra los detalles del teléfono cuando se carga', async () => {
    apiService.fetchPhoneDetail.mockResolvedValue(mockedPhoneDetail);
    renderPhoneDetail();

    expect(await screen.findByText('iPhone 12')).toBeInTheDocument();

    const brandElements = screen.getAllByText('Apple');
    expect(brandElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText('El iPhone 12 es el nuevo iPhone de Apple')
    ).toBeInTheDocument();

    expect(screen.getByText(/1000 EUR/i)).toBeInTheDocument();
  });

  test('actualiza el precio al seleccionar color y almacenamiento', async () => {
    apiService.fetchPhoneDetail.mockResolvedValue(mockedPhoneDetail);
    renderPhoneDetail();

    await screen.findByText('iPhone 12');

    const porcelanaSwatch = screen.getByTitle('Porcelana');
    fireEvent.click(porcelanaSwatch);

    const storageBtn = screen.getByText('128 GB');
    fireEvent.click(storageBtn);

    await waitFor(() => {
      expect(screen.getByText(/1220 EUR/i)).toBeInTheDocument();
    });
  });

  test("llama a addToCart y muestra alert al hacer clic en 'Añadir al carrito'", async () => {
    window.alert = jest.fn();

    apiService.fetchPhoneDetail.mockResolvedValue(mockedPhoneDetail);
    renderPhoneDetail();

    await screen.findByText('iPhone 12');

    const obsidianaSwatch = screen.getByTitle('Obsidiana');
    fireEvent.click(obsidianaSwatch);
    const storageBtn = screen.getByText('64 GB');
    fireEvent.click(storageBtn);

    const addButton = screen.getByRole('button', {
      name: /Añadir al carrito/i,
    });
    fireEvent.click(addButton);

    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Producto añadido al carrito');
  });
});
