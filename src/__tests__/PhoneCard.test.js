import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhoneCard from '../components/PhoneCard';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PhoneCard', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const phoneRelative = {
    id: '123',
    name: 'Test Phone',
    brand: 'Test Brand',
    imageUrl: '/images/test.jpg',
    basePrice: 500,
  };

  const phoneAbsolute = {
    ...phoneRelative,
    imageUrl: 'http://example.com/test.jpg',
  };

  test('renderiza correctamente la tarjeta con URL relativa', () => {
    render(
      <MemoryRouter>
        <PhoneCard phone={phoneRelative} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Phone')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('500 EUR')).toBeInTheDocument();

    const img = screen.getByAltText('Test Phone');
    expect(img).toHaveAttribute(
      'src',
      `https://prueba-tecnica-api-tienda-moviles.onrender.com${phoneRelative.imageUrl}`
    );
  });

  test('renderiza correctamente la tarjeta con URL absoluta', () => {
    render(
      <MemoryRouter>
        <PhoneCard phone={phoneAbsolute} />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Test Phone');
    expect(img).toHaveAttribute('src', phoneAbsolute.imageUrl);
  });

  test('navega a la URL correcta al hacer clic en la tarjeta', () => {
    render(
      <MemoryRouter>
        <PhoneCard phone={phoneRelative} />
      </MemoryRouter>
    );

    const card = screen.getByText('Test Phone').closest('.phone-card');
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith(`/phones/${phoneRelative.id}`);
  });
});
