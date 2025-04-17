import { useState, useEffect } from 'react';
import { fetchMovements } from '../utils/movementOperations';

export const useMovementLibrary = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useMovementLibrary: useEffect triggered');
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      console.log('useMovementLibrary: Starting to load movements');
      setLoading(true);
      const data = await fetchMovements();
      console.log('useMovementLibrary: Fetched movements:', data);
      setMovements(data || []);
    } catch (err) {
      console.error('useMovementLibrary: Error loading movements:', err);
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