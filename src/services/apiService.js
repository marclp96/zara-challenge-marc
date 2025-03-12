//credenciales api
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';
const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

export const fetchPhones = async () => {
  try {
    const url = `${BASE_URL}/products?limit=20`;
    console.log('Requesting:', url);
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en fetchPhones:', response.status, errorText);
      throw new Error('Error al obtener la lista de productos');
    }
    const data = await response.json();
    console.log('Data recibida:', data);
    return data;
  } catch (error) {
    console.error('fetchPhones error:', error);
    throw error;
  }
};

export const fetchPhoneDetail = async (id) => {
  try {
    const url = `${BASE_URL}/products/${id}`;
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en fetchPhoneDetail:', response.status, errorText);
      throw new Error(`Error al obtener el producto con ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchPhoneDetail error:', error);
    throw error;
  }
};

export const searchPhones = async (query) => {
  try {
    const url = `${BASE_URL}/products?search=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en searchPhones:', response.status, errorText);
      throw new Error('Error al realizar la búsqueda de productos');
    }
    return await response.json();
  } catch (error) {
    console.error('searchPhones error:', error);
    throw error;
  }
};