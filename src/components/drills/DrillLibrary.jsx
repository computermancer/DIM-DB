import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';

export function DrillLibrary() {
  const [drills, setDrills] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDrills = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('drills')
          .select('id, name')
          .order('name');

        if (error) throw error;
        setDrills(data || []);
      } catch (error) {
        console.error('Error fetching drills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrills();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading drills...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-orange-400 mb-8">Drill Library</h2>
      <div className="space-y-6">
        {drills.map((drill) => (
          <div key={drill.id} className="bg-[#2c2c2c] rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{drill.name}</h3>
              <Link 
                to={`/drill/${drill.id}`}
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
