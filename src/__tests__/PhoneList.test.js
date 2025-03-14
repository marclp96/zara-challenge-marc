import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneList from '../pages/PhoneList';
import * as apiService from '../services/apiService';
import userEvent from '@testing-library/user-event';

jest.mock('../services/apiService');

const mockedPhones = [
  {
    id: '1',
    name: 'iPhone 12',
    brand: 'Apple',
    imageUrl: 'https://example.com/iphone12.jpg',
    basePrice: 1000,
  },
  {
    id: '2',
    name: 'Galaxy S24',
    brand: 'Samsung',
    imageUrl: 'https://example.com/galaxys24.jpg',
    basePrice: 1200,
  },
];

describe('PhoneList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('carga y muestra los teléfonos en la carga inicial', async () => {
    apiService.fetchPhones.mockResolvedValue(mockedPhones);
    apiService.searchPhones.mockResolvedValue(mockedPhones);

    render(
      <BrowserRouter>
        <PhoneList />
      </BrowserRouter>
    );

    expect(await screen.findByText('iPhone 12')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText(/2 results/i)).toBeInTheDocument();
  });

  test('usa searchPhones cuando se introduce un query no vacío', async () => {
    apiService.fetchPhones.mockResolvedValue(mockedPhones);
    const searchResults = [
      {
        id: '1',
        name: 'iPhone 12',
        brand: 'Apple',
        imageUrl: 'https://example.com/iphone12.jpg',
        basePrice: 1000,
      },
    ];
    apiService.searchPhones.mockResolvedValue(searchResults);

    render(
      <BrowserRouter>
        <PhoneList />
      </BrowserRouter>
    );

    expect(await screen.findByText('iPhone 12')).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Search for a smartphone/i);
    userEvent.clear(input);
    userEvent.type(input, 'iPhone');

    await waitFor(() => {
      expect(apiService.searchPhones).toHaveBeenCalledWith('iPhone');
    });

    expect(screen.getByText(/1 results/i)).toBeInTheDocument();
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
  });

  test('vuelve a cargar la lista inicial cuando se borra el query', async () => {
    apiService.fetchPhones.mockResolvedValue(mockedPhones);
    apiService.searchPhones.mockResolvedValue(mockedPhones);

    render(
      <BrowserRouter>
        <PhoneList />
      </BrowserRouter>
    );

    expect(await screen.findByText('iPhone 12')).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Search for a smartphone/i);
    userEvent.type(input, 'Test');

    await waitFor(() => {
      expect(apiService.searchPhones).toHaveBeenCalledWith('Test');
    });

    userEvent.clear(input);

    await waitFor(() => {
      expect(apiService.fetchPhones).toHaveBeenCalled();

      expect(apiService.fetchPhones.mock.calls.length).toBeGreaterThanOrEqual(
        2
      );
    });
  });

  test('muestra mensaje de error cuando la API falla', async () => {
    const errorMessage = 'API error';
    apiService.fetchPhones.mockRejectedValue(new Error(errorMessage));

    render(
      <BrowserRouter>
        <PhoneList />
      </BrowserRouter>
    );

    expect(
      await screen.findByText(new RegExp(`Error: ${errorMessage}`, 'i'))
    ).toBeInTheDocument();
  });
});
