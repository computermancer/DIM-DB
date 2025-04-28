import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovements, updateMovement, deleteMovementById } from '../utils/movementOperations';

export const useMovementArchive = () => {
  const [searchParams] = useSearchParams();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movementToDelete, setMovementToDelete] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editedMovement, setEditedMovement] = useState({});
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      setLoading(true);
      const data = await fetchMovements();
      const movementId = searchParams.get('movement');
      
      if (movementId) {
        // Filter to show only the selected movement
        setMovements(data.filter(movement => movement.id === movementId) || []);
      } else {
        // Show all movements
        setMovements(data || []);
      }
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        type: 'error',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (movement) => {
    setEditMode(prev => ({ ...prev, [movement.id]: true }));
    setEditedMovement(prev => ({
      ...prev,
      [movement.id]: { ...movement }
    }));
  };

  const handleCancelEdit = (movementId) => {
    setEditMode(prev => ({ ...prev, [movementId]: false }));
    setEditedMovement(prev => ({
      ...prev,
      [movementId]: undefined
    }));
  };

  const handleFieldEdit = async (movementId, field, value) => {
    try {
      setLoading(true);
      const updatedData = { [field]: value };
      await updateMovement(movementId, updatedData);
      
      setMovements(movements.map(movement => 
        movement.id === movementId ? { ...movement, ...updatedData } : movement
      ));
      
      setToast({
        show: true,
        type: 'success',
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} saved successfully`
      });
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        type: 'error',
        message: err.message
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (movementId, data) => {
    try {
      setLoading(true);
      await updateMovement(movementId, data);
      
      setMovements(movements.map(movement => 
        movement.id === movementId ? { ...movement, ...data } : movement
      ));
      
      setToast({
        show: true,
        type: 'success',
        message: 'Movement updated successfully'
      });
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        type: 'error',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMovement = (movement) => {
    setMovementToDelete(movement);
  };

  const confirmDelete = async () => {
    if (!movementToDelete) return;
    
    try {
      setLoading(true);
      await deleteMovementById(movementToDelete.id);
      await loadMovements();
      setToast({
        show: true,
        type: 'success',
        message: 'Movement deleted successfully'
      });
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        type: 'error',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    movements,
    loading,
    error,
    movementToDelete,
    editMode,
    editedMovement,
    toast,
    loadMovements,
    handleStartEdit,
    handleCancelEdit,
    handleFieldEdit,
    handleSaveEdit,
    deleteMovement,
    confirmDelete,
    setMovementToDelete
  };
};
