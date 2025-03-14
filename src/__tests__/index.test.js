import React from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="root"></div>';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('index.js', () => {
  it('debe llamar a createRoot y renderizar la aplicación', () => {
    require('../index.js');
    expect(createRoot).toHaveBeenCalled();
  });
});
