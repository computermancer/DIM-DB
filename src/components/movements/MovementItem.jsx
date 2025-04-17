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
  fields
}) {
  const [expandedSections, setExpandedSections] = useState(new Set());
  
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
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [editedVideoUrl, setEditedVideoUrl] = useState('');
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

  const handleStartEditVideo = () => {
    console.log('Starting video edit');
    setEditedVideoUrl(movement.video_url || '');
    setIsEditingVideo(true);
  };

  const handleSaveVideo = async () => {
    try {
      console.log('Saving video URL:', editedVideoUrl);
      await onFieldEdit(movement.id, 'video_url', editedVideoUrl);
      setIsEditingVideo(false);
    } catch (error) {
      console.error('Failed to save video URL:', error);
    }
  };

  const handleCancelEditVideo = () => {
    console.log('Canceling video edit');
    setIsEditingVideo(false);
    setEditedVideoUrl('');
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
    <div className="bg-zinc-800 border border-zinc-700 p-4 rounded shadow relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-white">{movement.name}</h3>
            {movement.simple_name && (
              <span className="text-base text-zinc-400">({movement.simple_name})</span>
            )}
          </div>
          <p className="text-orange-300">{movement.category}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(movement)}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Delete Movement
          </button>
        )}
      </div>

      {/* Horizontal buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => toggleSection('info')}
          className={`px-4 py-2 rounded-md ${expandedSections.has('info') ? 'bg-blue-800 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
        >
          Information
        </button>
        <button
          onClick={() => toggleSection('mechanics')}
          className={`px-4 py-2 rounded-md ${expandedSections.has('mechanics') ? 'bg-blue-800 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
        >
          Mechanics
        </button>
        <button
          onClick={() => toggleSection('instructions')}
          className={`px-4 py-2 rounded-md ${expandedSections.has('instructions') ? 'bg-blue-800 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
        >
          Instructions
        </button>
        <button
          onClick={() => toggleSection('video')}
          className={`px-4 py-2 rounded-md ${expandedSections.has('video') ? 'bg-blue-800 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
        >
          Video
        </button>
        <button
          onClick={() => toggleSection('notes')}
          className={`px-4 py-2 rounded-md ${expandedSections.has('notes') ? 'bg-blue-800 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
        >
          Notes
        </button>
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        {/* Information section */}
        {expandedSections.has('info') && (
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-orange-300 font-semibold">Information</h4>
              {!isEditingInfo ? (
                <button
                  onClick={handleStartEditInfo}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm"
                >
                  Edit Information
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveInfo}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditInfo}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
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

        {/* Mechanics section */}
        {expandedSections.has('mechanics') && (
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-orange-300 font-semibold">Mechanics</h4>
              {!isEditingMechanics ? (
                <button
                  onClick={handleStartEditMechanics}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm"
                >
                  Edit Mechanics
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveMechanics}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditMechanics}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
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

        {/* Video section */}
        {expandedSections.has('video') && (
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-orange-300 font-semibold">Video</h4>
              <button
                onClick={handleStartEditVideo}
                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm"
              >
                Edit Video URL
              </button>
            </div>
            {isEditingVideo ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={editedVideoUrl}
                  onChange={(e) => setEditedVideoUrl(e.target.value)}
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveVideo}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditVideo}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : movement.video_url ? (
              <div className="text-white text-sm break-all">{movement.video_url}</div>
            ) : (
              <div className="text-zinc-400">No video available.</div>
            )}
          </div>
        )}

        {/* Instructions section */}
        {expandedSections.has('instructions') && (
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-md">
            <div className="flex justify-between items-start mb-4">
              <button
                onClick={handleCopyInstructions}
                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm"
              >
                Copy Instructions
              </button>
              {!isEditingInstructions ? (
                <button
                  onClick={handleStartEditInstructions}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm"
                >
                  Edit Instructions
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveInstructions}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditInstructions}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
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

        {/* Notes section */}
        {expandedSections.has('notes') && (
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-orange-300 font-semibold">Notes</h4>
              {!isEditingNotes ? (
                <button
                  onClick={handleStartEditNotes}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm"
                >
                  Edit Notes
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveNotes}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditNotes}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
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
