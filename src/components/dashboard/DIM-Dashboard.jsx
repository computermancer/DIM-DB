import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../common/Toast.jsx';
import { useMediaQuery } from '@mui/material';

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
  movement_position: '',
  movement_type: '',
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
    if (value.trim()) {
      acc[key] = value.trim();
    }
    return acc;
  }, {});
};

export default function DIMDashboard() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [newMovement, setNewMovement] = useState(INITIAL_MOVEMENT);
  const [textBlock, setTextBlock] = useState('');
  const navigate = useNavigate();
  const isPortrait = useMediaQuery('(orientation: portrait)');

  const addMovement = async (e) => {
    e.preventDefault();
    
    if (!newMovement.name.trim()) {
      showErrorToast('Movement name is required');
      return;
    }
    
    try {
      setLoading(true);
      
      const cleanData = cleanMovementData(newMovement);
      
      const { error } = await supabase
        .from('movements')
        .insert([cleanData])
        .select();
      
      if (error) throw error;
      
      setNewMovement(INITIAL_MOVEMENT);
      setTextBlock('');
      
      showSuccessToast('Movement added successfully');
      
      setTimeout(() => {
        navigate('/archive');
      }, 1500);
    } catch (err) {
      showErrorToast('Failed to add movement: ' + (err.message || 'Unknown error'));
      console.error('Error adding movement:', err);
    } finally {
      setLoading(false);
    }
  };

  const showErrorToast = (message) => {
    setSuccessMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const showSuccessToast = (message) => {
    setSuccessMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const parseTextBlock = () => {
    if (!textBlock.trim()) {
      showErrorToast('Please paste a movement block to parse');
      return;
    }
    
    try {
      const lines = textBlock.split('\n');
      const parsedMovement = { ...INITIAL_MOVEMENT };
      
      lines.forEach(line => {
        if (!line.trim()) return;
        
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        if (key && value) {
          const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');
          if (normalizedKey in parsedMovement) {
            parsedMovement[normalizedKey] = value;
          }
        }
      });
      
      setNewMovement(parsedMovement);
      showSuccessToast('Movement block parsed successfully');
    } catch (err) {
      showErrorToast('Failed to parse movement block: ' + err.message);
      console.error('Error parsing movement block:', err);
    }
  };

  const expandTextArea = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textArea => {
      const name = textArea.getAttribute('name');
      const shouldExpand = ['purpose', 'instructions', 'notes'].includes(name);
      if (textArea.value && shouldExpand) {
        expandTextArea(textArea);
      }
    });
  }, [newMovement]);

  return (
    <div className={`container mx-auto px-4 ${isPortrait ? 'py-4' : 'py-8'}`}>
      <h2 className={`${isPortrait ? 'text-xl' : 'text-2xl'} font-semibold text-orange-400 mb-4`}>Add New Movement</h2>
      
      <Toast 
        message={successMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        type={toastType} 
      />
      
      <div className="space-y-4">
        <div>
          <h3 className={`${isPortrait ? 'text-base' : 'text-lg'} font-medium mb-2 text-blue-400`}>Paste Full Movement Block</h3>
          <textarea
            value={textBlock}
            onChange={(e) => setTextBlock(e.target.value)}
            placeholder="Paste movement block here..."
            className="w-full p-3 border border-zinc-600 rounded-lg bg-zinc-700 text-white touch-target"
            rows={isPortrait ? 6 : 10}
          />
          <button
            onClick={parseTextBlock}
            className="touch-target mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
          >
            Parse Movement Block
          </button>
        </div>
        
        <form onSubmit={addMovement} className="space-y-4">
          {Object.entries(INITIAL_MOVEMENT).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className={`${isPortrait ? 'text-xs' : 'text-sm'} text-zinc-300`}>
                {key.replace(/_/g, ' ').replace(/\w+/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
              </label>
              <textarea
                name={key}
                value={newMovement[key]}
                onChange={(e) => setNewMovement(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full p-3 border border-zinc-600 rounded-lg bg-zinc-700 text-white touch-target"
                rows={isPortrait ? 2 : 3}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="touch-target w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Movement'}
          </button>
        </form>
      </div>
    </div>
  );
}
