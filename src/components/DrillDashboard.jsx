import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import { Toast } from './common/Toast';
import DrillFormSection from './common/DrillFormSection';

const INITIAL_DRILL = {
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

const autoExpand = (element) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

// Helper function to expand text areas when they receive content
const expandTextArea = (element, shouldExpand = true) => {
  if (element && element.value && shouldExpand) {
    autoExpand(element);
  }
};

export function DrillDashboard() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [newDrill, setNewDrill] = useState(INITIAL_DRILL);
  const [textBlock, setTextBlock] = useState('');
  const navigate = useNavigate();

  const showErrorToast = (message) => {
    setError(message);
    setSuccessMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const showSuccessToast = (message) => {
    setSuccessMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDrill(prev => ({ ...prev, [name]: value }));
  };

  const cleanDrillData = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value.trim()) {
        acc[key] = value.trim();
      }
      return acc;
    }, {});
  };

  const addDrill = async (e) => {
    e.preventDefault();
    
    if (!newDrill.name.trim()) {
      showErrorToast('Drill name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const cleanData = cleanDrillData(newDrill);
      
      const { data, error } = await supabase
        .from('drills')
        .insert([cleanData])
        .select();
      
      if (error) throw error;
      
      setNewDrill(INITIAL_DRILL);
      setTextBlock('');
      
      showSuccessToast('Drill added successfully');
      
      setTimeout(() => {
        navigate('/library');
      }, 1500);
    } catch (err) {
      showErrorToast('Failed to add drill: ' + (err.message || 'Unknown error'));
      console.error('Error adding drill:', err);
    } finally {
      setLoading(false);
    }
  };

  const parseTextBlock = () => {
    if (!textBlock.trim()) {
      showErrorToast('Please paste a drill block to parse');
      return;
    }
    
    try {
      const lines = textBlock.split('\n');
      const parsedDrill = { ...INITIAL_DRILL };
      
      lines.forEach(line => {
        if (!line.trim()) return;
        
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        if (key && value) {
          const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
          if (normalizedKey in parsedDrill) {
            parsedDrill[normalizedKey] = value;
          }
        }
      });
      
      setNewDrill(parsedDrill);
      showSuccessToast('Drill block parsed successfully');
    } catch (err) {
      showErrorToast('Failed to parse drill block: ' + err.message);
      console.error('Error parsing drill block:', err);
    }
  };

  const expandRef = (element, name) => {
    if (element) {
      const shouldExpand = ['purpose', 'instructions', 'notes'].includes(name);
      if (shouldExpand) {
        autoExpand(element);
      }
    }
  };

  useEffect(() => {
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textArea => {
      const name = textArea.getAttribute('name');
      const shouldExpand = ['purpose', 'instructions', 'notes'].includes(name);
      if (textArea.value && shouldExpand) {
        autoExpand(textArea);
      }
    });
  }, [newDrill]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-orange-400 mb-8">Add New Drill</h2>
      
      <Toast 
        message={successMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        type={toastType} 
      />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2 text-blue-400">Paste Full Drill Block</h3>
          <textarea
            className="w-full p-3 bg-[#1e1e1e] border border-[#3a3a3a] rounded text-white h-40"
            value={textBlock}
            onChange={(e) => setTextBlock(e.target.value)}
            placeholder="Paste your drill block here (format: Key: Value, one per line)"
          />
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            onClick={parseTextBlock}
          >
            Parse Block
          </button>
        </div>

        <form onSubmit={addDrill} className="space-y-6">
          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Name *</label>
                <div className="relative w-full">
                  <textarea
                    name="name"
                    value={newDrill.name}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the name of the drill"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Purpose</label>
                <div className="relative w-full">
                  <textarea
                    name="purpose"
                    value={newDrill.purpose}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the purpose of the drill"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Difficulty</label>
                <div className="relative w-full">
                  <textarea
                    name="difficulty"
                    value={newDrill.difficulty}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the difficulty level"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Skill Demands</label>
                <div className="relative w-full">
                  <textarea
                    name="skill_demands"
                    value={newDrill.skill_demands}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the skill demands"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Equipment Requirements</label>
                <div className="relative w-full">
                  <textarea
                    name="equipment_requirements"
                    value={newDrill.equipment_requirements}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the equipment requirements"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Execution Requirements</label>
                <div className="relative w-full">
                  <textarea
                    name="execution_requirements"
                    value={newDrill.execution_requirements}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the execution requirements"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Influences</label>
                <div className="relative w-full">
                  <textarea
                    name="influences"
                    value={newDrill.influences}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the influences"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Mechanics</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Plane</label>
                <div className="relative w-full">
                  <textarea
                    name="plane"
                    value={newDrill.plane}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the plane"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Chain Type</label>
                <div className="relative w-full">
                  <textarea
                    name="chain_type"
                    value={newDrill.chain_type}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the chain type"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Stance</label>
                <div className="relative w-full">
                  <textarea
                    name="stance"
                    value={newDrill.stance}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the stance"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Movement Types</label>
                <div className="relative w-full">
                  <textarea
                    name="movement_types"
                    value={newDrill.movement_types}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the movement types"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Region</label>
                <div className="relative w-full">
                  <textarea
                    name="region"
                    value={newDrill.region}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the region"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Joints</label>
                <div className="relative w-full">
                  <textarea
                    name="joints"
                    value={newDrill.joints}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the joints"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Joint Actions</label>
                <div className="relative w-full">
                  <textarea
                    name="joint_actions"
                    value={newDrill.joint_actions}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the joint actions"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Muscles</label>
                <div className="relative w-full">
                  <textarea
                    name="muscles"
                    value={newDrill.muscles}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the muscles"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Tendons</label>
                <div className="relative w-full">
                  <textarea
                    name="tendons"
                    value={newDrill.tendons}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the tendons"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Nervous System</label>
                <div className="relative w-full">
                  <textarea
                    name="nervous_system"
                    value={newDrill.nervous_system}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the nervous system"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Psychological</label>
                <div className="relative w-full">
                  <textarea
                    name="psychological"
                    value={newDrill.psychological}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the psychological"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">System Impact</label>
                <div className="relative w-full">
                  <textarea
                    name="system_impact"
                    value={newDrill.system_impact}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the system impact"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Instructions</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Setup</label>
                <div className="relative w-full">
                  <textarea
                    name="setup"
                    value={newDrill.setup}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the setup"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Cues</label>
                <div className="relative w-full">
                  <textarea
                    name="cues"
                    value={newDrill.cues}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the cues"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Sets</label>
                <div className="relative w-full">
                  <textarea
                    name="sets"
                    value={newDrill.sets}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the sets"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Reps</label>
                <div className="relative w-full">
                  <textarea
                    name="reps"
                    value={newDrill.reps}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the reps"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Tempo</label>
                <div className="relative w-full">
                  <textarea
                    name="tempo"
                    value={newDrill.tempo}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the tempo"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Breath</label>
                <div className="relative w-full">
                  <textarea
                    name="breath"
                    value={newDrill.breath}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the breath"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Rest</label>
                <div className="relative w-full">
                  <textarea
                    name="rest"
                    value={newDrill.rest}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the rest"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">What to Feel</label>
                <div className="relative w-full">
                  <textarea
                    name="what_to_feel"
                    value={newDrill.what_to_feel}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter what to feel"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">What to Avoid</label>
                <div className="relative w-full">
                  <textarea
                    name="what_to_avoid"
                    value={newDrill.what_to_avoid}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter what to avoid"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Red Flags</label>
                <div className="relative w-full">
                  <textarea
                    name="red_flags"
                    value={newDrill.red_flags}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the red flags"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Video</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Video URL</label>
                <div className="relative w-full">
                  <textarea
                    name="video_url"
                    value={newDrill.video_url}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Enter the video URL"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Notes</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Notes</label>
                <div className="relative w-full">
                  <textarea
                    name="notes"
                    value={newDrill.notes}
                    onChange={(e) => {
                      handleInputChange(e);
                      expandTextArea(e.target);
                    }}
                    className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
                    placeholder="Add any additional notes or considerations"
                    style={{
                      minHeight: '4rem',
                      lineHeight: '1.5',
                      resize: 'none',
                      overflow: 'auto'
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Adding Drill...' : 'Add Drill'}
          </button>
        </form>
      </div>
    </div>
  );
}