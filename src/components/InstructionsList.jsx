import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export function InstructionsList() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movementToDelete, setMovementToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovements();
  }, []);

  async function fetchMovements() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setMovements(data || []);
    } catch (err) {
      setError('Failed to fetch movements: ' + err.message);
      console.error('Error fetching movements:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMovement(id) {
    // Set the movement to delete, which will trigger the confirmation popup
    setMovementToDelete(movements.find(movement => movement.id === id));
  }

  async function confirmDelete() {
    if (!movementToDelete) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // First, delete any associated instructions
      const { error: instructionsError } = await supabase
        .from('movement_instructions')
        .delete()
        .eq('movement_id', movementToDelete.id);
      
      if (instructionsError) {
        console.error('Error deleting movement instructions:', instructionsError);
        // Continue with movement deletion even if instructions deletion fails
      }
      
      // Then delete the movement
      const { error } = await supabase
        .from('movements')
        .delete()
        .eq('id', movementToDelete.id);
      
      if (error) throw error;
      
      // Update the local state to remove the deleted movement
      setMovements(movements.filter(movement => movement.id !== movementToDelete.id));
      
      // Show success message
      setSuccessMessage('Movement deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to delete movement: ' + (err.message || 'Unknown error'));
      console.error('Error deleting movement:', err);
    } finally {
      setLoading(false);
      setMovementToDelete(null); // Close the popup after successful deletion
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-orange-400">Movement Instructions</h2>
      
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
        <div className="text-center py-8">Loading movements...</div>
      ) : movements.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No movements found. Add some movements to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movements.map((movement) => (
            <div key={movement.id} className="bg-[#2c2c2c] border border-[#3a3a3a] p-4 rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-orange-300">{movement.name}</h3>
                <div className="flex space-x-2">
                  <Link 
                    to={`/instructions/${movement.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {movement.instructions ? 'View Instructions' : 'Add Instructions'}
                  </Link>
                  <button
                    onClick={() => deleteMovement(movement.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {movement.instructions ? (
                <div className="mt-2">
                  <p className="text-gray-300 line-clamp-3">{movement.instructions}</p>
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
      {movementToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this movement?</p>
            <div className="flex justify-end space-x-4">
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setMovementToDelete(null)}
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
