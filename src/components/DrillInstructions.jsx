import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export function DrillInstructions() {
  const { drillId } = useParams();
  const navigate = useNavigate();
  const [drill, setDrill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (drillId) {
      fetchDrillAndInstructions();
    } else {
      setLoading(false);
    }
  }, [drillId]);

  async function fetchDrillAndInstructions() {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch the drill
      const { data: drillData, error: drillError } = await supabase
        .from('drills')
        .select('*')
        .eq('id', drillId)
        .single();
      
      if (drillError) {
        if (drillError.code === 'PGRST116') {
          // Drill not found
          setDrill(null);
          setEditedInstructions(null);
          setLoading(false);
          return;
        }
        throw drillError;
      }
      
      setDrill(drillData);
      
      // Try to fetch instructions
      const { data: instructionsData, error: instructionsError } = await supabase
        .from('drill_instructions')
        .select('*')
        .eq('drill_id', drillId)
        .single();
      
      if (instructionsError) {
        if (instructionsError.code === 'PGRST116') {
          // Instructions not found, create empty instructions
          const { data: newInstructions, error: createError } = await supabase
            .from('drill_instructions')
            .insert([
              {
                drill_id: drillId,
                instructions: '',
                steps: '',
                tips: '',
                common_mistakes: '',
                safety_notes: ''
              }
            ])
            .select()
            .single();
          
          if (createError) {
            console.error('Error creating empty instructions:', createError);
            setEditedInstructions(null);
          } else {
            setEditedInstructions(newInstructions);
          }
        } else {
          console.error('Error fetching instructions:', instructionsError);
          setEditedInstructions(null);
        }
      } else {
        setEditedInstructions(instructionsData);
      }
    } catch (err) {
      setError('Failed to fetch drill instructions: ' + (err.message || 'Unknown error'));
      console.error('Error fetching drill and instructions:', err);
    } finally {
      setLoading(false);
    }
  }

  async function saveInstructions() {
    try {
      setSaving(true);
      setError(null);
      
      const { error } = await supabase
        .from('drills')
        .update({ instructions: editedInstructions })
        .eq('id', drillId);
      
      if (error) throw error;
      
      // Update the drill state with the new instructions
      setDrill({
        ...drill,
        instructions: editedInstructions
      });
      
      setEditMode(false);
      setSuccessMessage('Instructions saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to save instructions: ' + err.message);
      console.error('Error saving instructions:', err);
    } finally {
      setSaving(false);
    }
  }

  async function addNewInstructions() {
    try {
      setSaving(true);
      setError(null);
      
      const { error } = await supabase
        .from('drills')
        .update({ instructions: newInstructions })
        .eq('id', drillId)
        .select();
      
      if (error) throw error;
      
      // Update the drill state with the new instructions
      setDrill({
        ...drill,
        instructions: newInstructions
      });
      
      // Don't reset the instructions - keep them visible
      setEditedInstructions(newInstructions);
      setNewInstructions('');
      
      // Show a success message
      setSuccessMessage('Instructions added successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to add instructions: ' + err.message);
      console.error('Error adding instructions:', err);
    } finally {
      setSaving(false);
    }
  }

  // Add a function to handle drill deletion
  async function deleteDrill() {
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    try {
      setLoading(true);
      setError(null);
      
      // First, delete any associated instructions
      const { error: instructionsError } = await supabase
        .from('drill_instructions')
        .delete()
        .eq('drill_id', drillId);
      
      if (instructionsError) {
        console.error('Error deleting drill instructions:', instructionsError);
        // Continue with drill deletion even if instructions deletion fails
      }
      
      // Then delete the drill
      const { error } = await supabase
        .from('drills')
        .delete()
        .eq('id', drillId);
      
      if (error) throw error;
      
      // Show success message
      setSuccessMessage('Drill deleted successfully');
      
      // Navigate back to the instructions list after a short delay
      setTimeout(() => {
        navigate('/instructions');
      }, 1500);
    } catch (err) {
      setError('Failed to delete drill: ' + (err.message || 'Unknown error'));
      console.error('Error deleting drill:', err);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-orange-400">Drill Instructions</h2>
      <div className="mb-6 flex justify-between">
        <Link 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          to="/instructions"
        >
          Back to Instructions
        </Link>
        
        {drill && (
          <button
            onClick={deleteDrill}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Drill
          </button>
        )}
      </div>

      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading drill instructions...</div>
      ) : error ? (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      ) : drillId && !drill ? (
        <div className="text-center py-8 text-gray-400">Drill not found.</div>
      ) : drillId && drill ? (
        <div className="bg-[#2c2c2c] border border-[#3a3a3a] p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-orange-300">{drill.name} Instructions</h3>
            {!editMode && drill.instructions ? (
              <button 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setEditMode(true)}
              >
                Edit Instructions
              </button>
            ) : null}
          </div>
          
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-300">Instructions</label>
                <textarea
                  className="w-full p-3 bg-[#1e1e1e] border border-[#3a3a3a] rounded text-white h-64"
                  value={editedInstructions}
                  onChange={(e) => setEditedInstructions(e.target.value)}
                  placeholder="Enter detailed instructions for this drill..."
                />
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setEditedInstructions(drill.instructions || '');
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                  onClick={saveInstructions}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : drill.instructions ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Instructions</h4>
                <p className="text-gray-300 whitespace-pre-line">{drill.instructions}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 italic mb-4">No instructions available yet. Please add instructions for this drill.</p>
              
              <div>
                <label className="block mb-2 text-gray-300">Instructions</label>
                <textarea
                  className="w-full p-3 bg-[#1e1e1e] border border-[#3a3a3a] rounded text-white h-64"
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  placeholder="Enter detailed instructions for this drill..."
                />
              </div>
              
              <button 
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                onClick={addNewInstructions}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Add Instructions'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>Select a drill from the Drill Library to view its instructions.</p>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this drill?</p>
            <div className="flex justify-end space-x-4">
              <button 
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowDeleteConfirm(false)}
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