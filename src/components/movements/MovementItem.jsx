import React, { useState, useRef, useEffect } from 'react';

export default function MovementItem({ 
  movement,
  setMovement,
  onDelete,
  onFieldEdit,
  editMode,
  editedMovement,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  fields,
  isPortrait
}) {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  
  // Preserve expanded state across re-renders
  useEffect(() => {
    if (movement.id) {
      if (expandedSections.size > 0) {
        localStorage.setItem(`movement-${movement.id}-expanded`, JSON.stringify(Array.from(expandedSections)));
      } else {
        localStorage.removeItem(`movement-${movement.id}-expanded`);
      }
    }
  }, [expandedSections, movement.id]);

  // Clear any invalid localStorage data and restore expanded state on mount
  useEffect(() => {
    if (movement.id) {
      try {
        const savedSections = localStorage.getItem(`movement-${movement.id}-expanded`);
        if (savedSections) {
          const parsed = JSON.parse(savedSections);
          if (Array.isArray(parsed)) {
            setExpandedSections(new Set(parsed));
          } else {
            // If not an array, remove invalid data
            localStorage.removeItem(`movement-${movement.id}-expanded`);
          }
        }
      } catch (e) {
        // If parsing fails, remove invalid data
        localStorage.removeItem(`movement-${movement.id}-expanded`);
      }
    }
  }, [movement.id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newSections = new Set(prev);
      if (newSections.has(section)) {
        newSections.delete(section);
      } else {
        newSections.add(section);
      }
      return newSections;
    });
  };

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isEditingMechanics, setIsEditingMechanics] = useState(false);
  const [editedMechanics, setEditedMechanics] = useState({});
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState({});
  const notesTextareaRef = useRef(null);

  // Auto-resize textarea
  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (isEditingNotes) {
      adjustTextareaHeight(notesTextareaRef);
    }
  }, [editedNotes, isEditingNotes]);

  const handleStartEditNotes = () => {
    setEditedNotes(movement.notes || '');
    setIsEditingNotes(true);
  };

  const handleCancelEditNotes = () => {
    setIsEditingNotes(false);
    setEditedNotes('');
  };

  const handleSaveNotes = async () => {
    try {
      // Save to database
      await onFieldEdit(movement.id, 'notes', editedNotes);
      setIsEditingNotes(false);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleCopyInstructions = () => {
    const textToCopy = `
Equipment Requirements:
${movement.equipment_requirements ? movement.equipment_requirements.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Equipment Alternatives:
${movement.equipment_alternatives ? movement.equipment_alternatives.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Setup:
${movement.setup ? movement.setup.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Instructions:
${movement.instructions ? movement.instructions.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Workout Parameters:
• Sets: ${movement.sets || 'Not specified'}
• Reps: ${movement.reps || 'Not specified'}
• Tempo: ${movement.tempo || 'Not specified'}
• Breath: ${movement.breath || 'Not specified'}
• Rest: ${movement.rest || 'Not specified'}

Cues:
${movement.cues ? movement.cues.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

What to Feel:
${movement.what_to_feel ? movement.what_to_feel.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

What to Avoid:
${movement.what_to_avoid ? movement.what_to_avoid.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Red Flags:
${movement.red_flags ? movement.red_flags.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Regressions:
${movement.regressions ? movement.regressions.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}

Progressions:
${movement.progressions ? movement.progressions.replace(/\.$/, '').split('.').map(sentence => `• ${sentence.trim()}`).join('\n') : 'Not specified'}
`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Instructions copied to clipboard!\n\nNote: The text is formatted for Google Docs. You can paste this into any document editor to maintain the bullet points and formatting.');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy instructions. Please try again.');
      });
  };

  const handleStartEditInfo = () => {
    setEditedInfo({
      purpose: movement.purpose || '',
      influences: movement.influences || '',
      difficulty: movement.difficulty || '',
      skill_demands: movement.skill_demands || '',
      execution_requirements: movement.execution_requirements || ''
    });
    setIsEditingInfo(true);
  };

  const handleSaveInfo = async () => {
    try {
      await onSaveEdit(movement.id, editedInfo);
      setIsEditingInfo(false);
    } catch (error) {
      console.error('Failed to save information:', error);
    }
  };

  const handleCancelEditInfo = () => {
    setIsEditingInfo(false);
    setEditedInfo({});
  };

  const handleInfoFieldChange = (field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartEditMechanics = () => {
    setEditedMechanics({
      plane: movement.plane || '',
      chain_type: movement.chain_type || '',
      stance: movement.stance || '',
      movement_types: movement.movement_types || '',
      region: movement.region || '',
      joints: movement.joints || '',
      joint_actions: movement.joint_actions || '',
      muscles: movement.muscles || '',
      tendons: movement.tendons || '',
      nervous_system: movement.nervous_system || '',
      psychological: movement.psychological || '',
      system_impact: movement.system_impact || ''
    });
    setIsEditingMechanics(true);
  };

  const handleSaveMechanics = async () => {
    try {
      await onSaveEdit(movement.id, editedMechanics);
      setIsEditingMechanics(false);
    } catch (error) {
      console.error('Failed to save mechanics:', error);
    }
  };

  const handleCancelEditMechanics = () => {
    setIsEditingMechanics(false);
    setEditedMechanics({});
  };

  const handleMechanicsFieldChange = (field, value) => {
    setEditedMechanics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartEditInstructions = () => {
    setEditedInstructions({
      equipment_requirements: movement.equipment_requirements || '',
      equipment_alternatives: movement.equipment_alternatives || '',
      setup: movement.setup || '',
      instructions: movement.instructions || '',
      cues: movement.cues || '',
      what_to_feel: movement.what_to_feel || '',
      what_to_avoid: movement.what_to_avoid || '',
      red_flags: movement.red_flags || '',
      regressions: movement.regressions || '',
      progressions: movement.progressions || '',
      sets: movement.sets || '',
      reps: movement.reps || '',
      tempo: movement.tempo || '',
      breath: movement.breath || '',
      rest: movement.rest || ''
    });
    setIsEditingInstructions(true);
  };

  const handleSaveInstructions = async () => {
    try {
      await onSaveEdit(movement.id, editedInstructions);
      setIsEditingInstructions(false);
    } catch (error) {
      console.error('Failed to save instructions:', error);
    }
  };

  const handleCancelEditInstructions = () => {
    setIsEditingInstructions(false);
    setEditedInstructions({});
  };

  const handleInstructionsFieldChange = (field, value) => {
    setEditedInstructions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`bg-zinc-800 rounded-lg p-${isPortrait ? '2' : '4'} shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`${isPortrait ? 'text-lg' : 'text-xl'} font-semibold text-orange-400`}>
          {movement.name}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onDelete(movement.id)}
            className="touch-target px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Horizontal buttons for section toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => toggleSection('info')}
          className={`touch-target px-3 py-1 rounded text-sm ${
            expandedSections.has('info') 
              ? 'bg-orange-500 text-white' 
              : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
          }`}
        >
          Info
        </button>
        <button
          onClick={() => toggleSection('mechanics')}
          className={`touch-target px-3 py-1 rounded text-sm ${
            expandedSections.has('mechanics') 
              ? 'bg-orange-500 text-white' 
              : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
          }`}
        >
          Mechanics
        </button>
        <button
          onClick={() => toggleSection('instructions')}
          className={`touch-target px-3 py-1 rounded text-sm ${
            expandedSections.has('instructions') 
              ? 'bg-orange-500 text-white' 
              : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
          }`}
        >
          Instructions
        </button>
        <button
          onClick={() => toggleSection('notes')}
          className={`touch-target px-3 py-1 rounded text-sm ${
            expandedSections.has('notes') 
              ? 'bg-orange-500 text-white' 
              : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => toggleSection('video')}
          className={`touch-target px-3 py-1 rounded text-sm ${
            expandedSections.has('video') 
              ? 'bg-orange-500 text-white' 
              : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
          }`}
        >
          Video
        </button>
      </div>

      {/* Video Section */}
      {expandedSections.has('video') && (
        <div className="mb-4 p-4 bg-zinc-700 rounded-lg">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={movement.video_url}
              title="Movement Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className={`space-y-${isPortrait ? '2' : '4'}`}>
        {/* Basic Info Section */}
        {expandedSections.has('info') && (
          <div className="bg-zinc-700 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className={`${isPortrait ? 'text-sm' : 'text-base'} font-medium text-blue-400`}>Basic Information</h4>
              {isEditingInfo ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveInfo}
                    className="touch-target px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditInfo}
                    className="touch-target px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartEditInfo}
                  className="touch-target px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Purpose', field: 'purpose', colSpan: '4' },
                { label: 'Movement Type', field: 'movement_type', colSpan: '1' },
                { label: 'Difficulty', field: 'difficulty', colSpan: '1' },
                { label: 'Skill Demands', field: 'skill_demands', colSpan: '1' },
                { label: 'Influences', field: 'influences', colSpan: '1' },
                { label: 'Execution Requirements', field: 'execution_requirements', colSpan: '4' }
              ].map(({ label, field, colSpan = 'auto' }) => (
                <div key={field} className={`bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-700 rounded-md p-3 transition-colors duration-200 ${colSpan === '4' ? 'col-span-4' : colSpan === '1' ? 'col-span-1' : ''}`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-orange-300 font-semibold">{label}</span>
                    {isEditingInfo ? (
                      <input
                        type="text"
                        value={editedInfo[field] || ''}
                        onChange={(e) => handleInfoFieldChange(field, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                      />
                    ) : (
                      <div className="space-y-1">
                        {field === 'execution_requirements' || field === 'influences' || field === 'skill_demands' ? (
                          <ul className="list-disc list-inside text-white">
                            {movement[field] ? movement[field].split(',').map((item, index) => (
                              <li key={index}>{item.trim()}</li>
                            )) : <li>Not specified</li>}
                          </ul>
                        ) : (
                          <span className="text-white">{movement[field] || 'Not specified'}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mechanics Section */}
        {expandedSections.has('mechanics') && (
          <div className="bg-zinc-700 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className={`${isPortrait ? 'text-sm' : 'text-base'} font-medium text-green-400`}>Mechanics</h4>
              {isEditingMechanics ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveMechanics}
                    className="touch-target px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditMechanics}
                    className="touch-target px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartEditMechanics}
                  className="touch-target px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Plane', field: 'plane' },
                { label: 'Chain Type', field: 'chain_type' },
                { label: 'Stance', field: 'stance' },
                { label: 'Movement Types', field: 'movement_types' },
                { label: 'Region', field: 'region' },
                { label: 'Joints', field: 'joints' },
                { label: 'Joint Actions', field: 'joint_actions' },
                { label: 'Muscles', field: 'muscles' },
                { label: 'Tendons', field: 'tendons' },
                { label: 'Nervous System', field: 'nervous_system' },
                { label: 'Psychological', field: 'psychological' },
                { label: 'System Impact', field: 'system_impact' }
              ].map(({ label, field }) => (
                <div key={field} className="bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-700 rounded-md p-3 transition-colors duration-200">
                  <div className="flex flex-col gap-1">
                    <span className="text-orange-300 font-semibold">{label}</span>
                    {isEditingMechanics ? (
                      <input
                        type="text"
                        value={editedMechanics[field] || ''}
                        onChange={(e) => handleMechanicsFieldChange(field, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                      />
                    ) : (
                      <ul className="list-disc list-inside text-white">
                        {movement[field] ? movement[field].split(',').map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        )) : <li>Not specified</li>}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Section */}
        {expandedSections.has('instructions') && (
          <div className="bg-zinc-700 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className={`${isPortrait ? 'text-sm' : 'text-base'} font-medium text-purple-400`}>Instructions</h4>
              {isEditingInstructions ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveInstructions}
                    className="touch-target px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditInstructions}
                    className="touch-target px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyInstructions}
                    className="touch-target px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-xs"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleStartEditInstructions}
                    className="touch-target px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-xs"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Equipment Requirements', field: 'equipment_requirements' },
                { label: 'Equipment Alternatives', field: 'equipment_alternatives' },
                { label: 'Setup', field: 'setup' },
                { label: 'Instructions', field: 'instructions' }
              ].map(({ label, field }) => (
                <div key={field}>
                  <div className="flex flex-col gap-1">
                    <span className="text-orange-300 font-semibold">{label}</span>
                    {isEditingInstructions ? (
                      <textarea
                        value={editedInstructions[field] || ''}
                        onChange={(e) => handleInstructionsFieldChange(field, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm w-full"
                        rows={3}
                      />
                    ) : (
                      <ul className="list-disc list-inside text-white">
                        {movement[field] ? movement[field].replace(/\.$/, '').split('.').map((sentence, index) => (
                          <li key={index}>{sentence.trim() + (sentence && sentence.trim().length > 0 ? '.' : '')}</li>
                        )) : <li>Not specified</li>}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {/* Workout Parameters */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-orange-300 font-semibold">Sets</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.sets || ''}
                      onChange={(e) => handleInstructionsFieldChange('sets', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm w-full"
                      rows={1}
                    />
                  ) : (
                    <span className="text-white">{movement.sets || 'Not specified'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-300 font-semibold">Reps</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.reps || ''}
                      onChange={(e) => handleInstructionsFieldChange('reps', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm w-full"
                      rows={1}
                    />
                  ) : (
                    <span className="text-white">{movement.reps || 'Not specified'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-300 font-semibold">Tempo</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.tempo || ''}
                      onChange={(e) => handleInstructionsFieldChange('tempo', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm w-full"
                      rows={1}
                    />
                  ) : (
                    <span className="text-white">{movement.tempo || 'Not specified'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-300 font-semibold">Breath</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.breath || ''}
                      onChange={(e) => handleInstructionsFieldChange('breath', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm w-full"
                      rows={1}
                    />
                  ) : (
                    <span className="text-white">{movement.breath || 'Not specified'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-300 font-semibold">Rest</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.rest || ''}
                      onChange={(e) => handleInstructionsFieldChange('rest', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm w-full"
                      rows={1}
                    />
                  ) : (
                    <span className="text-white">{movement.rest || 'Not specified'}</span>
                  )}
                </div>
              </div>

              {[
                { label: 'Cues', field: 'cues' },
                { label: 'What to Feel', field: 'what_to_feel' },
                { label: 'What to Avoid', field: 'what_to_avoid' },
                { label: 'Red Flags', field: 'red_flags' }
              ].map(({ label, field }) => (
                <div key={field}>
                  <div className="flex flex-col gap-1">
                    <span className="text-orange-300 font-semibold">{label}</span>
                    {isEditingInstructions ? (
                      <textarea
                        value={editedInstructions[field] || ''}
                        onChange={(e) => handleInstructionsFieldChange(field, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm w-full"
                        rows={3}
                      />
                    ) : (
                      <ul className="list-disc list-inside text-white">
                        {movement[field] ? movement[field].replace(/\.$/, '').split('.').map((sentence, index) => (
                          <li key={index}>{sentence.trim() + (sentence && sentence.trim().length > 0 ? '.' : '')}</li>
                        )) : <li>Not specified</li>}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {/* Regressions and Progressions */}
              <div>
                <div className="flex flex-col gap-1">
                  <span className="text-orange-300 font-semibold">Regressions</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.regressions || ''}
                      onChange={(e) => handleInstructionsFieldChange('regressions', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm w-full"
                      rows={3}
                    />
                  ) : (
                    <ul className="list-disc list-inside text-white">
                      {movement.regressions ? movement.regressions.replace(/\.$/, '').split('.').map((sentence, index) => (
                        <li key={index}>{sentence.trim() + (sentence && sentence.trim().length > 0 ? '.' : '')}</li>
                      )) : <li>Not specified</li>}
                    </ul>
                  )}
                </div>

                {/* Add extra spacing between regressions and progressions */}
                <div className="h-4"></div>

                <div className="flex flex-col gap-1">
                  <span className="text-orange-300 font-semibold">Progressions</span>
                  {isEditingInstructions ? (
                    <textarea
                      value={editedInstructions.progressions || ''}
                      onChange={(e) => handleInstructionsFieldChange('progressions', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm w-full"
                      rows={3}
                    />
                  ) : (
                    <ul className="list-disc list-inside text-white">
                      {movement.progressions ? movement.progressions.replace(/\.$/, '').split('.').map((sentence, index) => (
                        <li key={index}>{sentence.trim() + (sentence && sentence.trim().length > 0 ? '.' : '')}</li>
                      )) : <li>Not specified</li>}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Section */}
        {expandedSections.has('notes') && (
          <div className="bg-zinc-700 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className={`${isPortrait ? 'text-sm' : 'text-base'} font-medium text-yellow-400`}>Notes</h4>
              {isEditingNotes ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveNotes}
                    className="touch-target px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditNotes}
                    className="touch-target px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartEditNotes}
                  className="touch-target px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditingNotes ? (
              <textarea
                ref={notesTextareaRef}
                value={editedNotes}
                onChange={(e) => {
                  setEditedNotes(e.target.value);
                  adjustTextareaHeight(notesTextareaRef);
                }}
                className="w-full min-h-[100px] bg-zinc-800 border border-zinc-700 rounded p-2 text-white resize-none overflow-hidden"
                placeholder="Enter notes..."
              />
            ) : (
              <div className="whitespace-pre-wrap text-white">{movement.notes || 'No notes provided.'}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
