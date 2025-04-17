import React from 'react';
import { DRILL_FIELDS } from '../../constants/movementFields';

export default function MovementEditForm({ movement, editedMovement, onFieldEdit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {DRILL_FIELDS.map(({ name, label }) => (
        <div key={name}>
          <span className="text-gray-400">{label}:</span>{' '}
          <input
            type="text"
            value={editedMovement[movement.id]?.[name] || ''}
            onChange={(e) => onFieldEdit(movement.id, name, e.target.value)}
            className="bg-[#1e1e1e] border border-[#3a3a3a] rounded px-2 py-1 text-white w-full mt-1"
          />
        </div>
      ))}
    </div>
  );
}
