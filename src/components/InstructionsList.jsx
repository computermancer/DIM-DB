import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export function InstructionsList() {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drillToDelete, setDrillToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrills();
  }, []);

  async function fetchDrills() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('drills')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setDrills(data || []);
    } catch (err) {
      setError('Failed to fetch drills: ' + err.message);
      console.error('Error fetching drills:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteDrill(id) {
    // Set the drill to delete, which will trigger the confirmation popup
    setDrillToDelete(drills.find(drill => drill.id === id));
  }

  async function confirmDelete() {
    if (!drillToDelete) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // First, delete any associated instructions
      const { error: instructionsError } = await supabase
        .from('drill_instructions')
        .delete()
        .eq('drill_id', drillToDelete.id);
      
      if (instructionsError) {
        console.error('Error deleting drill instructions:', instructionsError);
        // Continue with drill deletion even if instructions deletion fails
      }
      
      // Then delete the drill
      const { error } = await supabase
        .from('drills')
        .delete()
        .eq('id', drillToDelete.id);
      
      if (error) throw error;
      
      // Update the local state to remove the deleted drill
      setDrills(drills.filter(drill => drill.id !== drillToDelete.id));
      
      // Show success message
      setSuccessMessage('Drill deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to delete drill: ' + (err.message || 'Unknown error'));
      console.error('Error deleting drill:', err);
    } finally {
      setLoading(false);
      setDrillToDelete(null); // Close the popup after successful deletion
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-orange-400">Drill Instructions</h2>
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">Loading drills...</div>
      ) : drills.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No drills found. Add some drills to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drills.map((drill) => (
            <div key={drill.id} className="bg-[#2c2c2c] border border-[#3a3a3a] p-4 rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-orange-300">{drill.name}</h3>
                <div className="flex space-x-2">
                  <Link 
                    to={`/instructions/${drill.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {drill.instructions ? 'View Instructions' : 'Add Instructions'}
                  </Link>
                  <button
                    onClick={() => deleteDrill(drill.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {drill.instructions ? (
                <div className="mt-2">
                  <p className="text-gray-300 line-clamp-3">{drill.instructions}</p>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-400 italic">No instructions available yet.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Popup */}
      {drillToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this drill?</p>
            <div className="flex justify-end space-x-4">
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setDrillToDelete(null)}
              >
                Cancel
              </button>
              <button 
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 