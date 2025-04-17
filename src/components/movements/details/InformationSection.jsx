import React from 'react';

export function InformationSection({ 
  isEditing, 
  onEditClick, 
  formData, 
  onFormChange, 
  onSubmit 
}) {
  const fields = [
    { name: 'purpose', label: 'Purpose' },
    { name: 'movement_type', label: 'Movement Type' },
    { name: 'difficulty', label: 'Difficulty' },
    { name: 'skill_demands', label: 'Skill Demands' },
    { name: 'influences', label: 'Influences' },
    { name: 'execution_requirements', label: 'Execution Requirements' }
  ];

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-300">Information</h3>
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
