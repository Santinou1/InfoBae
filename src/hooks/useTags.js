import { useState, useEffect } from 'react';
import { tagService } from '../api';

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await tagService.getList();
        console.log('Tags API Response:', response);
        // La API devuelve un array de strings directamente
        setTags(response.data || []);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err.message || 'Error al cargar los tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};
