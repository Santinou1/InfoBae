import { createBackendUrl } from '../config.js';

class FavoritesService {
  // Obtener el token de Google del localStorage
  getAuthToken() {
    return localStorage.getItem('googleToken');
  }

  // Headers con autenticación
  getHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Obtener todos los favoritos del usuario
  async getFavorites() {
    try {
      const response = await fetch(createBackendUrl('/api/favorites'), {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo favoritos:', error);
      throw error;
    }
  }

  // Agregar un post a favoritos
  async addFavorite(postId) {
    try {
      const response = await fetch(createBackendUrl('/api/favorites'), {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ postId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error agregando favorito:', error);
      throw error;
    }
  }

  // Eliminar un post de favoritos
  async removeFavorite(postId) {
    try {
      const response = await fetch(createBackendUrl(`/api/favorites/${postId}`), {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error eliminando favorito:', error);
      throw error;
    }
  }

  // Verificar si un post está en favoritos
  async checkFavorite(postId) {
    try {
      const response = await fetch(createBackendUrl(`/api/favorites/check/${postId}`), {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verificando favorito:', error);
      throw error;
    }
  }
}

export default new FavoritesService();
