import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';

export function MovementLibrary() {
  const [movements, setMovements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovements = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('movements')
          .select('id, name')
          .order('name');

        if (error) throw error;
        setMovements(data || []);
      } catch (error) {
        console.error('Error fetching movements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading movements...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-orange-400 mb-8">Movement Library</h2>
      <div className="space-y-6">
        {movements.map((movement) => (
          <div key={movement.id} className="bg-[#2c2c2c] rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{movement.name}</h3>
              <Link 
                to={`/movement/${movement.id}`}
                className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
