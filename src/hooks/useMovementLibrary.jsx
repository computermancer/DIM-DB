import { useState, useEffect } from 'react';
import { fetchMovements } from '../utils/movementOperations';

export const useMovementIndex = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useMovementIndex: useEffect triggered');
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      console.log('useMovementIndex: Starting to load movements');
      setLoading(true);
      const data = await fetchMovements();
      console.log('useMovementIndex: Fetched movements:', data);
      setMovements(data || []);
    } catch (err) {
      console.error('useMovementIndex: Error loading movements:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    movements,
    loading,
    error,
    loadMovements
  };
}; 