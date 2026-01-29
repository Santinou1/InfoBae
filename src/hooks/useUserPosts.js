import { useState, useEffect } from 'react';
import { postService } from '../api';

export const useUserPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getListByUser(userId);
        console.log('User Posts API Response:', response);
        setPosts(response.data || []);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError(err.message || 'Error al cargar los posts del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return { posts, loading, error };
};
