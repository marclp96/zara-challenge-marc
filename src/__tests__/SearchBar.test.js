import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renderiza el input con el placeholder correcto', () => {
    const onQueryChangeMock = jest.fn();
    render(<SearchBar onQueryChange={onQueryChangeMock} />);

    const input = screen.getByPlaceholderText(/Search for a smartphone/i);
    expect(input).toBeInTheDocument();
  });

  test('llama a onQueryChange con el valor correcto al escribir', () => {
    const onQueryChangeMock = jest.fn();
    render(<SearchBar onQueryChange={onQueryChangeMock} />);

    const input = screen.getByPlaceholderText(/Search for a smartphone/i);
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(onQueryChangeMock).toHaveBeenCalledWith('iPhone');
  });

  test('muestra el número de resultados cuando se proporciona resultCount', () => {
    const onQueryChangeMock = jest.fn();
    render(<SearchBar onQueryChange={onQueryChangeMock} resultCount={5} />);

    expect(screen.getByText(/5 results/i)).toBeInTheDocument();
  });

  test('no muestra el número de resultados si resultCount no está definido', () => {
    const onQueryChangeMock = jest.fn();
    render(<SearchBar onQueryChange={onQueryChangeMock} />);

    const resultsText = screen.queryByText(/results/i);
    expect(resultsText).toBeNull();
  });
});
