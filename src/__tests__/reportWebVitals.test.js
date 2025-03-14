import reportWebVitals from '../reportWebVitals';
import { waitFor } from '@testing-library/react';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('llama a las funciones de web-vitals si se proporciona onPerfEntry', async () => {
    const onPerfEntry = jest.fn();
    reportWebVitals(onPerfEntry);

    await new Promise((resolve) => setImmediate(resolve));

    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

    expect(getCLS).toHaveBeenCalledWith(onPerfEntry);
    expect(getFID).toHaveBeenCalledWith(onPerfEntry);
    expect(getFCP).toHaveBeenCalledWith(onPerfEntry);
    expect(getLCP).toHaveBeenCalledWith(onPerfEntry);
    expect(getTTFB).toHaveBeenCalledWith(onPerfEntry);
  });

  test('no llama a funciones de web-vitals si onPerfEntry no es una función', async () => {
    reportWebVitals(null);

    await new Promise((resolve) => setImmediate(resolve));

    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});
