import React, { useState } from 'react';
import { Toast } from '../common/Toast';
import MovementItem from './MovementItem';
import ConfirmationModal from '../common/ConfirmationModal';
import { DRILL_FIELDS } from '../../constants/movementFields';
import { useMovementArchive } from '../../hooks/useMovementArchive';

export function MovementArchive() {
  const {
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
  } = useMovementArchive();

  const handleDelete = (id) => {
    deleteMovement(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await confirmDelete();
      setMovementToDelete(null); // Reset the state after deletion
    } catch (error) {
      console.error('Error deleting movement:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-8">Loading movements...</div>
      ) : movements.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No movements found. Add some movements to get started.</div>
      ) : (
        <div className="space-y-4">
          {movements.map((movement) => (
            <MovementItem
              key={movement.id}
              movement={movement}
              setMovement={(updatedMovement) => {
                loadMovements(); // Refresh the list after update
              }}
              editMode={editMode}
              editedMovement={editedMovement}
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

      {movementToDelete && (
        <ConfirmationModal
          isOpen={!!movementToDelete}
          onCancel={() => {
            setMovementToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Movement"
          message={`Are you sure you want to delete the movement "${movementToDelete.name}"?`}
        />
      )}

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setMovementToDelete(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}