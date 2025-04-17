import React from 'react';

export function InstructionsSection({ 
  isEditing, 
  onEditClick, 
  formData, 
  onFormChange, 
  onSubmit 
}) {
  const fields = [
    { name: 'setup', label: 'Setup' },
    { name: 'instructions', label: 'Instructions' },
    { name: 'set', label: 'Set' },
    { name: 'reps', label: 'Reps' },
    { name: 'tempo', label: 'Tempo' },
    { name: 'breath', label: 'Breath' },
    { name: 'rest', label: 'Rest' },
    { name: 'cues', label: 'Cues' },
    { name: 'what_to_feel', label: 'What to Feel' },
    { name: 'what_to_avoid', label: 'What to Avoid' },
    { name: 'red_flags', label: 'Red Flags' },
    { name: 'equipment_requirements', label: 'Equipment Requirements' }
  ];

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-300">Instructions</h3>
        <button
          onClick={onEditClick}
          className="bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="col-span-1">
                <label className="text-lg font-semibold mb-2 block">{field.label}</label>
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={onFormChange}
                  className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                  rows="3"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="col-span-1">
              <h4 className="text-lg font-semibold mb-2">{field.label}</h4>
              <p className="text-gray-300">{formData[field.name] || 'No content available'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
