import { useState, useEffect } from 'react';
import { fetchDrills, updateDrill, deleteDrillById } from '../utils/drillOperations';

export const useDrillArchive = () => {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drillToDelete, setDrillToDelete] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editedDrill, setEditedDrill] = useState({});
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  useEffect(() => {
    loadDrills();
  }, []);

  const loadDrills = async () => {
    try {
      setLoading(true);
      const data = await fetchDrills();
      setDrills(data || []);
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

  const handleStartEdit = (drill) => {
    setEditMode(prev => ({ ...prev, [drill.id]: true }));
    setEditedDrill(prev => ({
      ...prev,
      [drill.id]: { ...drill }
    }));
  };

  const handleCancelEdit = (drillId) => {
    setEditMode(prev => ({ ...prev, [drillId]: false }));
    setEditedDrill(prev => ({
      ...prev,
      [drillId]: undefined
    }));
  };

  const handleFieldEdit = async (drillId, field, value) => {
    try {
      setLoading(true);
      const updatedData = { [field]: value };
      await updateDrill(drillId, updatedData);
      
      setDrills(drills.map(drill => 
        drill.id === drillId ? { ...drill, ...updatedData } : drill
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

  const handleSaveEdit = async (drillId, data) => {
    try {
      setLoading(true);
      await updateDrill(drillId, data);
      
      setDrills(drills.map(drill => 
        drill.id === drillId ? { ...drill, ...data } : drill
      ));
      
      setToast({
        show: true,
        type: 'success',
        message: 'Drill updated successfully'
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

  const deleteDrill = (drill) => {
    setDrillToDelete(drill);
  };

  const confirmDelete = async () => {
    if (!drillToDelete) return;
    
    try {
      setLoading(true);
      await deleteDrillById(drillToDelete.id);
      
      setDrills(drills.filter(d => d.id !== drillToDelete.id));
      setDrillToDelete(null);
      
      setToast({
        show: true,
        type: 'success',
        message: 'Drill deleted successfully'
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
    drills,
    loading,
    error,
    setDrillToDelete,
    drillToDelete,
    editMode,
    editedDrill,
    toast,
    loadDrills,
    handleStartEdit,
    handleCancelEdit,
    handleFieldEdit,
    handleSaveEdit,
    deleteDrill,
    confirmDelete
  };
};
