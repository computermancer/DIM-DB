import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { MovementLibraryCard } from './MovementLibraryCard';

export function MovementLibrary() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        <p className="text-gray-400 mb-4">No movements found in the library.</p>
        <button
          onClick={() => navigate('/archive')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          View Archive
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300">Movement Library</h1>
        <button
          onClick={() => navigate('/archive')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          View Archive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movements.map((movement) => (
          <MovementLibraryCard key={movement.id} movement={movement} />
        ))}
      </div>
    </div>
  );
}
