import React, { useState } from 'react';
import { Toast } from '../common/Toast';
import DrillItem from './DrillItem';
import ConfirmationModal from '../common/ConfirmationModal';
import { DRILL_FIELDS } from '../../constants/drillFields';
import { useDrillArchive } from '../../hooks/useDrillArchive';

export function DrillArchive() {
  const {
    drills,
    loading,
    error,
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
    confirmDelete,
    setDrillToDelete
  } = useDrillArchive();

  const handleDelete = (id) => {
    deleteDrill(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await confirmDelete();
      setDrillToDelete(null); // Reset the state after deletion
    } catch (error) {
      console.error('Error deleting drill:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-8">Loading drills...</div>
      ) : drills.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No drills found. Add some drills to get started.</div>
      ) : (
        <div className="space-y-4">
          {drills.map((drill) => (
            <DrillItem
              key={drill.id}
              drill={drill}
              setDrill={(updatedDrill) => {
                loadDrills(); // Refresh the list after update
              }}
              editMode={editMode}
              editedDrill={editedDrill}
              onStartEdit={handleStartEdit}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
              onFieldEdit={handleFieldEdit}
              fields={DRILL_FIELDS}
            />
          ))}
        </div>
      )}

      {drillToDelete && (
        <ConfirmationModal
          isOpen={!!drillToDelete}
          onCancel={() => {
            setDrillToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Drill"
          message={`Are you sure you want to delete the drill "${drillToDelete.name}"?`}
        />
      )}

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setDrillToDelete(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}