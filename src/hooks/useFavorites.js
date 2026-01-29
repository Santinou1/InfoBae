import { useState, useEffect, useCallback } from 'react';
import favoritesService from '../api/services/favoritesService';
import { useAuth } from '../context/AuthContext';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Cargar favoritos cuando el usuario está autenticado
  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await favoritesService.getFavorites();
      
      if (response.success) {
        setFavorites(response.favorites || []);
      }
    } catch (err) {
      console.error('Error cargando favoritos:', err);
      setError('Error cargando favoritos');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar favoritos al montar o cuando cambia la autenticación
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Agregar a favoritos
  const addFavorite = async (postId) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para guardar favoritos');
      return false;
    }

    try {
      const response = await favoritesService.addFavorite(postId);
      
      if (response.success) {
        setFavorites(response.favorites || []);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error agregando favorito:', err);
      alert('Error al agregar favorito');
      return false;
    }
  };

  // Eliminar de favoritos
  const removeFavorite = async (postId) => {
    try {
      const response = await favoritesService.removeFavorite(postId);
      
      if (response.success) {
        setFavorites(response.favorites || []);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error eliminando favorito:', err);
      alert('Error al eliminar favorito');
      return false;
    }
  };

  // Verificar si un post está en favoritos
  const isFavorite = (postId) => {
    return favorites.some(fav => fav.postId === postId);
  };

  // Toggle favorito (agregar o eliminar)
  const toggleFavorite = async (postId) => {
    if (isFavorite(postId)) {
      return await removeFavorite(postId);
    } else {
      return await addFavorite(postId);
    }
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refreshFavorites: loadFavorites
  };
};
