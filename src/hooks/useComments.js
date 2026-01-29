import { useState, useEffect } from 'react';
import { commentService } from '../api';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await commentService.getListByPost(postId);
        console.log('Comments API Response:', response);
        setComments(response.data || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err.message || 'Error al cargar los comentarios');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return { comments, loading, error };
};
