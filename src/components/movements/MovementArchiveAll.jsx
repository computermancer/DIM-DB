import React from 'react';
import { Toast } from '../common/Toast';
import MovementItem from './MovementItem';
import ConfirmationModal from '../common/ConfirmationModal';
import { DRILL_FIELDS } from '../../constants/movementFields';
import { useMovementArchiveAll } from '../../hooks/useMovementArchiveAll';
import { useMediaQuery } from '@mui/material';

export function MovementArchiveAll() {
  const {
    movements,
    loading,
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
  } = useMovementArchiveAll();

  const isPortrait = useMediaQuery('(orientation: portrait)');

  const handleDelete = (id) => {
    deleteMovement(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await confirmDelete();
      setMovementToDelete(null);
    } catch (error) {
      console.error('Error deleting movement:', error);
    }
  };

  return (
    <div className={`container mx-auto px-4 ${isPortrait ? 'py-4' : 'py-8'}`}>
      {loading ? (
        <div className={`text-center ${isPortrait ? 'py-4' : 'py-8'} text-gray-400`}>Loading movements...</div>
      ) : movements.length === 0 ? (
        <div className={`text-center ${isPortrait ? 'py-4' : 'py-8'} text-gray-400`}>No movements found. Add some movements to get started.</div>
      ) : (
        <div className={`space-y-${isPortrait ? '2' : '4'}`}>
          {movements.map((movement) => (
            <MovementItem
              key={movement.id}
              movement={movement}
              setMovement={(updatedMovement) => {
                loadMovements();
              }}
              editMode={editMode}
              editedMovement={editedMovement}
              onStartEdit={handleStartEdit}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
              onFieldEdit={handleFieldEdit}
              fields={DRILL_FIELDS}
              isPortrait={isPortrait}
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
          isPortrait={isPortrait}
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
