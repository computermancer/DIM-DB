import React from 'react';

export function MovementFormSection({ title, fields, values, onChange, handleAddMovement, handleMovementChange, showSuccessToast, showErrorToast, cleanMovementData, INITIAL_DRILL }) {
  return (
    <div className="border-t border-[#3a3a3a] pt-6">
      <h3 className="text-lg font-medium mb-4 text-blue-400">{title}</h3>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-gray-300">
              {field.label}
              {field.required && ' *'}
            </label>
            <input
              type="text"
              name={field.name}
              className="w-full p-3 bg-[#1e1e1e] border border-[#3a3a3a] rounded text-white"
              value={values[field.name]}
              onChange={(e) => handleMovementChange(field.name, e.target.value)}
              required={field.required}
              autoComplete="off"
            />
          </div>
        ))}
        <button onClick={handleAddMovement}>Add Movement</button>
      </div>
    </div>
  );
}
