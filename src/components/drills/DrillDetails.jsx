import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import ReactPlayer from 'react-player';
import { FaWindowClose } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

export function DrillDetails() {
  const { id } = useParams();
  const [drill, setDrill] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState([]);
  const [showVideoPopup, setShowVideoPopup] = React.useState(false);
  const [videoPosition, setVideoPosition] = React.useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [newVideoUrl, setNewVideoUrl] = React.useState('');
  const [showVideo, setShowVideo] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editInformation, setEditInformation] = React.useState(false);
  const [editInstructions, setEditInstructions] = React.useState(false);
  const [editNotes, setEditNotes] = React.useState(false);
  const [editMechanics, setEditMechanics] = React.useState(false);
  const [instructionsForm, setInstructionsForm] = React.useState({
    setup: '',
    instructions: '',
    set: '',
    reps: '',
    tempo: '',
    breath: '',
    rest: '',
    cues: '',
    what_to_feel: '',
    what_to_avoid: '',
    red_flags: '',
    equipment_requirements: '',
    equipment_alternatives: '',
    regressions: '',
    progressions: ''
  });

  const [informationForm, setInformationForm] = React.useState({
    purpose: '',
    difficulty: '',
    skill_demands: '',
    influences: '',
    execution_requirements: ''
  });

  const [notesForm, setNotesForm] = React.useState({
    notes: ''
  });

  const [mechanicsForm, setMechanicsForm] = React.useState({
    mechanics: '',
    mechanics_notes: '',
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
    system_impact: ''
  });

  // Initialize form state with current drill data
  React.useEffect(() => {
    if (drill) {
      setInformationForm({
        purpose: drill.purpose || '',
        difficulty: drill.difficulty || '',
        skill_demands: drill.skill_demands || '',
        influences: drill.influences || '',
        execution_requirements: drill.execution_requirements || ''
      });
      setInstructionsForm({
        setup: drill.setup || '',
        instructions: drill.instructions || '',
        set: drill.set || '',
        reps: drill.reps || '',
        tempo: drill.tempo || '',
        breath: drill.breath || '',
        rest: drill.rest || '',
        cues: drill.cues || '',
        what_to_feel: drill.what_to_feel || '',
        what_to_avoid: drill.what_to_avoid || '',
        red_flags: drill.red_flags || '',
        equipment_requirements: drill.equipment_requirements || '',
        equipment_alternatives: drill.equipment_alternatives || '',
        regressions: drill.regressions || '',
        progressions: drill.progressions || ''
      });
      setNotesForm({
        notes: drill.notes || ''
      });
      setMechanicsForm({
        mechanics: drill.mechanics || '',
        mechanics_notes: drill.mechanics_notes || '',
        plane: drill.plane || '',
        chain_type: drill.chain_type || '',
        stance: drill.stance || '',
        movement_types: drill.movement_types || '',
        region: drill.region || '',
        joints: drill.joints || '',
        joint_actions: drill.joint_actions || '',
        muscles: drill.muscles || '',
        tendons: drill.tendons || '',
        nervous_system: drill.nervous_system || '',
        psychological: drill.psychological || '',
        system_impact: drill.system_impact || ''
      });
    }
  }, [drill]);

  React.useEffect(() => {
    const fetchDrill = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('drills')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setDrill(data);
      } catch (error) {
        console.error('Error fetching drill:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrill();
  }, [id]);

  // Handle video URL update
  const handleUpdateVideo = async () => {
    try {
      await supabase
        .from('drills')
        .update({ video_url: newVideoUrl })
        .eq('id', drill?.id);
      
      // Update local state
      setDrill(prev => prev ? { ...prev, video_url: newVideoUrl } : prev);
      
      // Close modal
      setShowEditModal(false);
      
      // Reset input
      setNewVideoUrl('');
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  // Handle video popup drag
  const handleVideoDragStart = (e) => {
    setIsDragging(true);
    const rect = e.target.parentElement.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleVideoDrag = (e) => {
    if (!isDragging) return;
    setVideoPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleVideoDragEnd = () => {
    setIsDragging(false);
  };

  // Handle video popup close
  const handleVideoClose = () => {
    setShowVideoPopup(false);
  };

  // Handle drill deletion
  const handleDeleteDrill = async () => {
    try {
      await supabase
        .from('drills')
        .delete()
        .eq('id', drill?.id);

      // Redirect to drill list after deletion
      window.location.href = '/drills';
    } catch (error) {
      console.error('Error deleting drill:', error);
      alert('Failed to delete drill. Please try again.');
    }
  };

  // Handle escape key to close popup
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleVideoClose();
      }
    };

    if (showVideoPopup) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showVideoPopup]);

  // Handle information update
  const handleUpdateInformation = async () => {
    try {
      await supabase
        .from('drills')
        .update(informationForm)
        .eq('id', drill?.id);
      
      // Update local state
      setDrill(prev => prev ? { ...prev, ...informationForm } : prev);
      
      // Close edit mode
      setEditInformation(false);
    } catch (error) {
      console.error('Error updating information:', error);
      alert('Failed to update information. Please try again.');
    }
  };

  // Handle instructions update
  const handleUpdateInstructions = async () => {
    try {
      await supabase
        .from('drills')
        .update(instructionsForm)
        .eq('id', drill?.id);
      
      // Update local state
      setDrill(prev => prev ? { ...prev, ...instructionsForm } : prev);
      
      // Close edit mode
      setEditInstructions(false);
    } catch (error) {
      console.error('Error updating instructions:', error);
      alert('Failed to update instructions. Please try again.');
    }
  };

  // Handle notes update
  const handleUpdateNotes = async () => {
    try {
      await supabase
        .from('drills')
        .update({ notes: notesForm.notes })
        .eq('id', drill?.id);
      
      // Update local state
      setDrill(prev => prev ? { ...prev, notes: notesForm.notes } : prev);
      
      // Close edit mode
      setEditNotes(false);
    } catch (error) {
      console.error('Error updating notes:', error);
      alert('Failed to update notes. Please try again.');
    }
  };

  // Handle mechanics update
  const handleUpdateMechanics = async () => {
    try {
      await supabase
        .from('drills')
        .update(mechanicsForm)
        .eq('id', drill?.id);
      
      // Update local state
      setDrill(prev => prev ? { ...prev, ...mechanicsForm } : prev);
      
      // Close edit mode
      setEditMechanics(false);
    } catch (error) {
      console.error('Error updating mechanics:', error);
      alert('Failed to update mechanics. Please try again.');
    }
  };

  // Handle information form change
  const handleInformationChange = (e) => {
    const { name, value } = e.target;
    setInformationForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle instructions form change
  const handleInstructionsChange = (e) => {
    const { name, value } = e.target;
    setInstructionsForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle notes form change
  const handleNotesChange = (e) => {
    const { name, value } = e.target;
    setNotesForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle mechanics form change
  const handleMechanicsChange = (e) => {
    const { name, value } = e.target;
    setMechanicsForm(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">Loading drill details...</div>
      </div>
    );
  }

  // Button labels (not connected to database)
  const buttonSections = [
    { id: 'information', title: 'Information' },
    { id: 'mechanics', title: 'Mechanics' },
    { id: 'instructions', title: 'Instructions' },
    { id: 'video', title: 'Video' },
    { id: 'notes', title: 'Notes' }
  ];

  // Reorder buttons for display
  const reorderedButtons = [
    buttonSections[0], // Information
    buttonSections[3], // Video
    buttonSections[2], // Instructions
    buttonSections[1], // Mechanics
    buttonSections[4]  // Notes
  ];

  // Helper function to split content safely by periods
  const getBulletPoints = (content) => {
    if (!content) return ['No content available'];
    // Split by period and trim whitespace
    return content.split('.').map(item => item.trim()).filter(item => item);
  };

  // Helper function to split content safely by commas
  const getCommaSeparatedItems = (content) => {
    if (!content) return ['No content available'];
    // Split by comma and trim whitespace
    return content.split(',').map(item => item.trim()).filter(item => item);
  };

  // Database content sections
  const contentSections = [
    { 
      id: 'information', 
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Information</h3>
            <button
              onClick={() => setEditInformation(!editInformation)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <FaEdit className="w-4 h-4" />
              Edit Information
            </button>
          </div>
          {editInformation ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateInformation(); }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Purpose - 3 columns */}
                <div className="col-span-3 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Purpose</label>
                  <textarea
                    name="purpose"
                    value={informationForm.purpose}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Middle row - 3 columns */}
                <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Difficulty</label>
                  <input
                    type="text"
                    name="difficulty"
                    value={informationForm.difficulty}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                  />
                </div>

                <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Skill Demands</label>
                  <input
                    type="text"
                    name="skill_demands"
                    value={informationForm.skill_demands}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                  />
                </div>

                <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Influences</label>
                  <input
                    type="text"
                    name="influences"
                    value={informationForm.influences}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                  />
                </div>

                {/* Execution Requirements - 3 columns */}
                <div className="col-span-3 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Execution Requirements</label>
                  <textarea
                    name="execution_requirements"
                    value={informationForm.execution_requirements}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setEditInformation(false)}
                  className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Purpose - 3 columns */}
              <div className="col-span-3 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Purpose</h4>
                <p className="text-gray-300">{drill?.purpose || 'No purpose specified'}</p>
              </div>

              {/* Middle row - 3 columns */}
              <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Difficulty</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.difficulty).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Skill Demands</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.skill_demands).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Influences</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.influences).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Execution Requirements - 3 columns */}
              <div className="col-span-3 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Execution Requirements</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.execution_requirements).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    },
    { 
      id: 'mechanics', 
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Mechanics</h3>
            <button
              onClick={() => setEditMechanics(!editMechanics)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <FaEdit className="w-4 h-4" />
              Edit Mechanics
            </button>
          </div>
          {editMechanics ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateMechanics(); }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Plane */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Plane</label>
                  <textarea
                    name="plane"
                    value={mechanicsForm.plane}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Chain Type */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Chain Type</label>
                  <textarea
                    name="chain_type"
                    value={mechanicsForm.chain_type}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Stance */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Stance</label>
                  <textarea
                    name="stance"
                    value={mechanicsForm.stance}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Movement Types */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Movement Types</label>
                  <textarea
                    name="movement_types"
                    value={mechanicsForm.movement_types}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Region */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Region</label>
                  <textarea
                    name="region"
                    value={mechanicsForm.region}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Joints */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Joints</label>
                  <textarea
                    name="joints"
                    value={mechanicsForm.joints}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Joint Actions */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Joint Actions</label>
                  <textarea
                    name="joint_actions"
                    value={mechanicsForm.joint_actions}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Muscles */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Muscles</label>
                  <textarea
                    name="muscles"
                    value={mechanicsForm.muscles}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Tendons */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Tendons</label>
                  <textarea
                    name="tendons"
                    value={mechanicsForm.tendons}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Nervous System */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Nervous System</label>
                  <textarea
                    name="nervous_system"
                    value={mechanicsForm.nervous_system}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Psychological */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Psychological</label>
                  <textarea
                    name="psychological"
                    value={mechanicsForm.psychological}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* System Impact */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">System Impact</label>
                  <textarea
                    name="system_impact"
                    value={mechanicsForm.system_impact}
                    onChange={handleMechanicsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setEditMechanics(false)}
                  className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Plane */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Plane</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.plane).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Chain Type */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Chain Type</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.chain_type).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Stance */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Stance</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.stance).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Movement Types */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Movement Types</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.movement_types).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Region */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Region</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.region).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Joints */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Joints</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.joints).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Joint Actions */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Joint Actions</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.joint_actions).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Muscles */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Muscles</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.muscles).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Tendons */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Tendons</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.tendons).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Nervous System */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Nervous System</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.nervous_system).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Psychological */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Psychological</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.psychological).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* System Impact */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">System Impact</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.system_impact).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    },
    { 
      id: 'video', 
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-300">Video</h3>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm"
              >
                {showVideo ? 'Hide Video' : 'Show Video'}
              </button>
              <button
                onClick={() => {
                  setShowVideoPopup(true);
                  setVideoPosition({ x: 50, y: 50 });
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded text-sm"
              >
                Pop-Up Video
              </button>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <FaEdit className="w-4 h-4" />
              Edit Video
            </button>
          </div>
          {drill?.video_url && (
            <div className="mt-2">
              <p className="text-gray-300">Video URL: {drill.video_url}</p>
              {showVideo && (
                <div className="relative w-full mt-4">
                  <div className="aspect-video">
                    <ReactPlayer
                      url={drill.video_url}
                      className="w-full h-full"
                      width="100%"
                      height="100%"
                      controls
                      disablePictureInPicture
                      config={{
                        youtube: {
                          playerVars: { modestbranding: 1 }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )
    },
    { 
      id: 'instructions', 
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Instructions</h3>
            <button
              onClick={() => setEditInstructions(!editInstructions)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <FaEdit className="w-4 h-4" />
              Edit Instructions
            </button>
          </div>
          {editInstructions ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateInstructions(); }}>
              <div className="space-y-4">
                {/* Equipment Requirements */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Equipment Requirements</label>
                  <textarea
                    name="equipment_requirements"
                    value={instructionsForm.equipment_requirements}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Equipment Alternatives */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Equipment Alternatives</label>
                  <textarea
                    name="equipment_alternatives"
                    value={instructionsForm.equipment_alternatives}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Setup */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Setup</label>
                  <textarea
                    name="setup"
                    value={instructionsForm.setup}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Instructions */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Instructions</label>
                  <textarea
                    name="instructions"
                    value={instructionsForm.instructions}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Set, Reps, Tempo, Breath, Rest */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="text-lg font-semibold mr-2">Set:</label>
                      <input
                        type="text"
                        name="set"
                        value={instructionsForm.set}
                        onChange={handleInstructionsChange}
                        className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="text-lg font-semibold mr-2">Reps:</label>
                      <input
                        type="text"
                        name="reps"
                        value={instructionsForm.reps}
                        onChange={handleInstructionsChange}
                        className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="text-lg font-semibold mr-2">Tempo:</label>
                      <input
                        type="text"
                        name="tempo"
                        value={instructionsForm.tempo}
                        onChange={handleInstructionsChange}
                        className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="text-lg font-semibold mr-2">Breath:</label>
                      <input
                        type="text"
                        name="breath"
                        value={instructionsForm.breath}
                        onChange={handleInstructionsChange}
                        className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="text-lg font-semibold mr-2">Rest:</label>
                      <input
                        type="text"
                        name="rest"
                        value={instructionsForm.rest}
                        onChange={handleInstructionsChange}
                        className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Cues */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Cues</label>
                  <textarea
                    name="cues"
                    value={instructionsForm.cues}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* What to Feel */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">What to Feel</label>
                  <textarea
                    name="what_to_feel"
                    value={instructionsForm.what_to_feel}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* What to Avoid */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">What to Avoid</label>
                  <textarea
                    name="what_to_avoid"
                    value={instructionsForm.what_to_avoid}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Red Flags */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Red Flags</label>
                  <textarea
                    name="red_flags"
                    value={instructionsForm.red_flags}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Regressions */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Regressions</label>
                  <textarea
                    name="regressions"
                    value={instructionsForm.regressions}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>

                {/* Progressions */}
                <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Progressions</label>
                  <textarea
                    name="progressions"
                    value={instructionsForm.progressions}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setEditInstructions(false)}
                  className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Equipment Requirements */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Equipment Requirements</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.equipment_requirements).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Equipment Alternatives */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Equipment Alternatives</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(drill?.equipment_alternatives).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Setup */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Setup</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.setup).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Instructions</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.instructions).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Set, Reps, Tempo, Breath, Rest */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-300">Sets:</span>
                    <span className="text-gray-300 ml-2">{drill?.set || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-300">Reps:</span>
                    <span className="text-gray-300 ml-2">{drill?.reps || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-300">Tempo:</span>
                    <span className="text-gray-300 ml-2">{drill?.tempo || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-300">Breath:</span>
                    <span className="text-gray-300 ml-2">{drill?.breath || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-300">Rest:</span>
                    <span className="text-gray-300 ml-2">{drill?.rest || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Cues */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Cues</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.cues).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* What to Feel */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">What to Feel</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.what_to_feel).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* What to Avoid */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">What to Avoid</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.what_to_avoid).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Red Flags */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Red Flags</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.red_flags).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Regressions */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Regressions</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.regressions).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Progressions */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Progressions</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getBulletPoints(drill?.progressions).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    },
    { 
      id: 'notes', 
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Notes</h3>
            <button
              onClick={() => setEditNotes(!editNotes)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <FaEdit className="w-4 h-4" />
              Edit Notes
            </button>
          </div>
          {editNotes ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateNotes(); }}>
              <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <label className="text-lg font-semibold mb-2 block">Notes</label>
                <textarea
                  name="notes"
                  value={notesForm.notes}
                  onChange={handleNotesChange}
                  className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                  rows="6"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setEditNotes(false)}
                  className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
              <h4 className="text-lg font-semibold mb-2">Notes</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{drill?.notes || 'No notes yet'}</p>
            </div>
          )}
        </div>
      )
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId) 
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Edit Video Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-zinc-800 p-6 rounded-lg w-96">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Edit Video URL</h3>
          <div className="mb-4">
            <input
              type="text"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              placeholder="Enter video URL"
              className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateVideo}
              className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      )}
      {/* Video Popup */}
      {showVideoPopup && drill?.video_url && (
        <div
          className="fixed z-50"
          style={{
            left: videoPosition.x,
            top: videoPosition.y
          }}
        >
          <div 
            className="bg-zinc-800 rounded-lg border border-white/10 shadow-lg"
            style={{
              width: 400,
              height: 350
            }}
          >
            <div 
              className="bg-zinc-700 rounded-t-lg border-b border-white/10 cursor-move flex items-center justify-between px-2"
              style={{
                height: 30
              }}
              onMouseDown={handleVideoDragStart}
              onMouseUp={handleVideoDragEnd}
              onMouseMove={handleVideoDrag}
            >
              <div className="flex items-center">
                <h3 className="text-sm font-semibold text-gray-300">Video</h3>
              </div>
              <button
                onClick={handleVideoClose}
                className="bg-red-500 hover:bg-red-400 text-white w-6 h-6 rounded-full flex items-center justify-center"
              >
                <FaWindowClose className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full h-[320px] bg-black overflow-hidden">
              <ReactPlayer
                url={drill.video_url}
                className="w-full h-full"
                width="100%"
                height="100%"
                controls
                disablePictureInPicture
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1 }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-4">Are you sure you want to delete this drill? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDrill}
                className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-10 bg-[#2c2c2c] p-4 shadow-md mb-8 rounded-lg">
        {/* Drill Name and Delete Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">{drill?.name}</span>
            <span className="text-xl text-gray-400">({drill?.simple_name})</span>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
          >
            <FaTrash className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Section Buttons */}
        <div className="grid grid-cols-5 gap-4">
          {reorderedButtons.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                expandedSections.includes(section.id)
                  ? 'bg-zinc-700 text-white' 
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Content */}
      <div className="space-y-4">
        {contentSections.map((section) => (
          expandedSections.includes(section.id) && (
            <div key={section.id} className="mt-4 bg-zinc-800 rounded-lg p-4 border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-300">{section.title}</h3>
                </div>
              </div>
              {section.content}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
