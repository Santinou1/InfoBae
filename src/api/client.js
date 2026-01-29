import { apiConfig } from './config';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${apiConfig.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // No lanzar error para 500, solo para otros códigos
        if (response.status === 500) {
          console.warn(`API returned 500 for ${endpoint}, returning empty data`);
          return { data: [], total: 0 };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // Si es un error de red o parsing, lanzar el error
      if (error.message.includes('HTTP error')) {
        throw error;
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
