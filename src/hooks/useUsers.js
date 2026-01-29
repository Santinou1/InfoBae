import { useState, useEffect } from 'react';
import { userService } from '../api';

export const useUsers = (params = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getList(params);
        console.log('Users API Response:', response);
        setUsers(response.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [JSON.stringify(params)]);

  return { users, loading, error };
};
