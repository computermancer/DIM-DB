const INITIAL_MOVEMENT = {
  name: '',
  simple_name: '',
  purpose: '',
  influences: '',
  difficulty: '',
  skill_demands: '',
  equipment_requirements: '',
  equipment_alternatives: '',
  execution_requirements: '',
  regressions: '',
  progressions: '',
  plane: '',
  chain_type: '',
  movement_type: '',
  stance: '',
  movement_types: '',
  region: '',
  joints: '',
  joint_actions: '',
  muscles: '',
  tendons: '',
  nervous_system: '',
  psychological: '',
  system_impact: '',
  instructions: '',
  video_url: '',
  setup: '',
  cues: '',
  sets: '',
  reps: '',
  tempo: '',
  breath: '',
  rest: '',
  what_to_feel: '',
  what_to_avoid: '',
  red_flags: '',
  notes: ''
};

const cleanMovementData = (data) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value && value.trim()) {
      acc[key] = value.trim();
    }
    return acc;
  }, {});
};

export { INITIAL_MOVEMENT, cleanMovementData };
