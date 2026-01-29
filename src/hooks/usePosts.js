import { useState, useEffect } from 'react';
import { postService } from '../api';

export const usePosts = (initialParams = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit] = useState(initialParams.limit || 20);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {
          ...initialParams,
          page,
          limit,
        };
        const response = await postService.getList(params);
        console.log('Posts API Response:', response);
        setPosts(response.data || []);
        setTotal(response.total || 0);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);
  const hasMore = (page + 1) * limit < total;

  return { 
    posts, 
    loading, 
    error, 
    page, 
    setPage,
    total,
    totalPages,
    hasMore
  };
};
