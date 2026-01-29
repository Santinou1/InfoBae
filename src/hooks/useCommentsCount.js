import { useState, useEffect } from 'react';
import { commentService } from '../api';

/**
 * Hook para obtener el conteo de comentarios de múltiples posts
 * @param {Array} posts - Array de posts
 * @returns {Object} { commentsCount, loading }
 */
export const useCommentsCount = (posts) => {
  const [commentsCount, setCommentsCount] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setCommentsCount({});
      return;
    }

    const fetchCommentsCount = async () => {
      try {
        setLoading(true);
        
        // Obtener comentarios para cada post con manejo de errores individual
        const promises = posts.map(async (post) => {
          try {
            const response = await commentService.getListByPost(post.id);
            return {
              postId: post.id,
              count: response.data?.length || 0,
            };
          } catch (err) {
            // Si hay error 500 o cualquier otro, simplemente retornar 0
            // No mostrar error en consola para no saturar
            if (err.message && !err.message.includes('500')) {
              console.warn(`Could not fetch comments for post ${post.id}`);
            }
            return {
              postId: post.id,
              count: 0,
            };
          }
        });

        const results = await Promise.all(promises);
        
        // Convertir array a objeto { postId: count }
        const countsMap = results.reduce((acc, { postId, count }) => {
          acc[postId] = count;
          return acc;
        }, {});

        console.log('Comments count loaded:', Object.keys(countsMap).length, 'posts');
        setCommentsCount(countsMap);
      } catch (err) {
        console.error('Error fetching comments count:', err);
        // En caso de error general, establecer conteo en 0 para todos
        const fallbackCounts = posts.reduce((acc, post) => {
          acc[post.id] = 0;
          return acc;
        }, {});
        setCommentsCount(fallbackCounts);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsCount();
  }, [posts?.length]); // Solo re-ejecutar si cambia la cantidad de posts

  return { commentsCount, loading };
};
