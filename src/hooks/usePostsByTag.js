import { useState, useEffect } from 'react';
import { postService } from '../api';

export const usePostsByTag = (tagId, initialParams = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit] = useState(initialParams.limit || 20);

  useEffect(() => {
    if (!tagId) {
      setPosts([]);
      setTotal(0);
      return;
    }

    const fetchPostsByTag = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {
          ...initialParams,
          page,
          limit,
        };
        const response = await postService.getListByTag(tagId, params);
        console.log('Posts by Tag API Response:', response);
        setPosts(response.data || []);
        setTotal(response.total || 0);
      } catch (err) {
        console.error('Error fetching posts by tag:', err);
        setError(err.message || 'Error al cargar los posts por tag');
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByTag();
  }, [tagId, page, limit]);

  // Reset page when tag changes
  useEffect(() => {
    setPage(0);
  }, [tagId]);

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
