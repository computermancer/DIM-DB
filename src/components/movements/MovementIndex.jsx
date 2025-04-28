import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { MovementIndexCard } from './MovementIndexCard';

export function MovementIndex() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setMovements(data);
    } catch (error) {
      console.error('Error fetching movements:', error);
      setError('Failed to load movements');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading movements...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-400">{error}</div>;
  }

  if (movements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">No movements found in the Index.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movements.map((movement) => (
          <MovementIndexCard key={movement.id} movement={movement} />
        ))}
      </div>
    </div>
  );
}
