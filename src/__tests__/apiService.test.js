import {
  fetchPhones,
  fetchPhoneDetail,
  searchPhones,
} from '../services/apiService';

describe('apiService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPhones', () => {
    test('retorna los datos cuando la respuesta es exitosa', async () => {
      const mockData = { products: [{ id: 1, name: 'Test Phone' }] };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const data = await fetchPhones();
      expect(data).toEqual(mockData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=20',
        { headers: { 'x-api-key': '87909682e6cd74208f41a6ef39fe4191' } }
      );
    });

    test('lanza un error cuando la respuesta no es exitosa', async () => {
      const errorText = 'Not Found';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        text: async () => errorText,
      });

      await expect(fetchPhones()).rejects.toThrow(
        'Error al obtener la lista de productos'
      );
    });
  });

  describe('fetchPhoneDetail', () => {
    test('retorna los datos del teléfono cuando la respuesta es exitosa', async () => {
      const phoneId = '123';
      const mockData = { id: phoneId, name: 'Test Phone Detail' };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const data = await fetchPhoneDetail(phoneId);
      expect(data).toEqual(mockData);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${phoneId}`,
        { headers: { 'x-api-key': '87909682e6cd74208f41a6ef39fe4191' } }
      );
    });

    test('lanza un error cuando la respuesta no es exitosa', async () => {
      const phoneId = '123';
      const errorText = 'Error detail';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => errorText,
      });

      await expect(fetchPhoneDetail(phoneId)).rejects.toThrow(
        `Error al obtener el producto con ID: ${phoneId}`
      );
    });
  });

  describe('searchPhones', () => {
    test('retorna los resultados de búsqueda cuando la respuesta es exitosa', async () => {
      const query = 'Test';
      const mockData = { products: [{ id: 1, name: 'Test Phone' }] };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const data = await searchPhones(query);
      expect(data).toEqual(mockData);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products?search=${encodeURIComponent(
          query
        )}`,
        { headers: { 'x-api-key': '87909682e6cd74208f41a6ef39fe4191' } }
      );
    });

    test('lanza un error cuando la respuesta de búsqueda no es exitosa', async () => {
      const query = 'Test';
      const errorText = 'Search error';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 400,
        text: async () => errorText,
      });

      await expect(searchPhones(query)).rejects.toThrow(
        'Error al realizar la búsqueda de productos'
      );
    });
  });
});
