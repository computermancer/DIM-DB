import React from 'react';
import { DRILL_FIELDS } from '../../constants/drillFields';

export default function DrillEditForm({ drill, editedDrill, onFieldEdit }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {DRILL_FIELDS.map(({ name, label }) => (
        <div key={name}>
          <span className="text-gray-400">{label}:</span>{' '}
          <input
            type="text"
            value={editedDrill[drill.id]?.[name] || ''}
            onChange={(e) => onFieldEdit(drill.id, name, e.target.value)}
            className="bg-[#1e1e1e] border border-[#3a3a3a] rounded px-2 py-1 text-white w-full mt-1"
          />
        </div>
      ))}
    </div>
  );
}
