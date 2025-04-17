const validateMovement = (movement) => {
  const errors = [];
  
  // Required fields
  const requiredFields = [
    { field: 'name', label: 'Movement name' },
    { field: 'purpose', label: 'Purpose' },
    { field: 'movement_type', label: 'Movement type' },
    { field: 'difficulty', label: 'Difficulty' },
    { field: 'skill_demands', label: 'Skill demands' },
    { field: 'influences', label: 'Influences' },
    { field: 'execution_requirements', label: 'Execution requirements' },
    { field: 'stance', label: 'Stance' },
    { field: 'chain_type', label: 'Chain type' },
    { field: 'plane', label: 'Plane' },
    { field: 'region', label: 'Region' },
    { field: 'nervous_system', label: 'Nervous system' },
    { field: 'psychological', label: 'Psychological aspects' },
    { field: 'equipment_requirements', label: 'Equipment requirements' },
    { field: 'equipment_alternatives', label: 'Equipment alternatives' },
    { field: 'setup', label: 'Setup instructions' },
    { field: 'instructions', label: 'Execution instructions' },
    { field: 'sets', label: 'Sets recommendations' },
    { field: 'reps', label: 'Reps recommendations' },
    { field: 'tempo', label: 'Tempo recommendations' },
    { field: 'breath', label: 'Breathing recommendations' },
    { field: 'rest', label: 'Rest recommendations' },
    { field: 'cues', label: 'Coaching cues' },
    { field: 'what_to_feel', label: 'What to feel' },
    { field: 'what_to_avoid', label: 'What to avoid' },
    { field: 'red_flags', label: 'Red flags' },
    { field: 'regressions', label: 'Regression options' },
    { field: 'progressions', label: 'Progression options' },
    { field: 'notes', label: 'Additional notes' },
    { field: 'movement_types', label: 'Movement types' },
    { field: 'joints', label: 'Joints' },
    { field: 'muscles', label: 'Muscles' },
    { field: 'tendons', label: 'Tendons' },
    { field: 'joint_actions', label: 'Joint actions' }
  ];

  // Validate required fields
  requiredFields.forEach(field => {
    const value = movement[field.field];
    if (!value || typeof value !== 'string' || !value.trim()) {
      errors.push(`${field.label} is required`);
      console.log(`Validation failed for ${field.field}:`, value);
    }
  });

  return errors;
};

export { validateMovement };
