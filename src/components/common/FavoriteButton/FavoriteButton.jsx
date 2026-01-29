import { useState } from 'react';
import { useFavorites } from '../../../hooks/useFavorites';
import { useAuth } from '../../../context/AuthContext';
import './FavoriteButton.css';

export const FavoriteButton = ({ postId }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isFav = isFavorite(postId);

  const handleClick = async (e) => {
    e.stopPropagation(); // Evitar que abra el modal del post
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }

    setIsProcessing(true);
    await toggleFavorite(postId);
    setIsProcessing(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button 
      className={`favorite-button ${isFav ? 'active' : ''}`}
      onClick={handleClick}
      disabled={isProcessing}
      title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
};
