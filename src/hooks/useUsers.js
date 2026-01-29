import { useState, useEffect } from 'react';
import { userService } from '../api';

export const useUsers = (initialParams = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit] = useState(initialParams.limit || 20);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {
          ...initialParams,
          page,
          limit,
        };
        const response = await userService.getList(params);
        console.log('Users API Response:', response);
        setUsers(response.data || []);
        setTotal(response.total || 0);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);
  const hasMore = (page + 1) * limit < total;

  return { 
    users, 
    loading, 
    error,
    page,
    setPage,
    total,
    totalPages,
    hasMore
  };
};
