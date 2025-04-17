import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { VideoSection } from './details/VideoSection';
import { InstructionsSection } from './details/InstructionsSection';
import { InformationSection } from './details/InformationSection';
import { MechanicsSection } from './details/MechanicsSection';
import { NotesSection } from './details/NotesSection';
import { DeleteConfirmationModal } from './details/DeleteConfirmationModal';

export function MovementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movement, setMovement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState(new Set(['information']));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    purpose: '',
    influences: '',
    difficulty: '',
    skill_demands: '',
    execution_requirements: ''
  });
  const [isEditingMechanics, setIsEditingMechanics] = useState(false);
  const [editedMechanics, setEditedMechanics] = useState({
    joint_actions: '',
    muscle_actions: '',
    biomechanics: ''
  });
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [editedVideoUrl, setEditedVideoUrl] = useState('');
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState({
    setup: '',
    instructions: '',
    sets: '',
    reps: '',
    tempo: '',
    breath: '',
    rest: '',
    cues: '',
    what_to_feel: '',
    what_to_avoid: '',
    red_flags: '',
    equipment_requirements: ''
  });

  useEffect(() => {
    fetchMovement();
  }, [id]);

  const fetchMovement = async () => {
    try {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setMovement(data);
      
      // Initialize all state with data from the movement
      setEditedInfo({
        purpose: data.purpose || '',
        influences: data.influences || '',
        difficulty: data.difficulty || '',
        skill_demands: data.skill_demands || '',
        execution_requirements: data.execution_requirements || ''
      });

      setEditedMechanics({
        joint_actions: data.joint_actions || '',
        muscle_actions: data.muscle_actions || '',
        biomechanics: data.biomechanics || ''
      });

      setEditedInstructions({
        setup: data.setup || '',
        instructions: data.instructions || '',
        sets: data.sets || '',
        reps: data.reps || '',
        tempo: data.tempo || '',
        breath: data.breath || '',
        rest: data.rest || '',
        cues: data.cues || '',
        what_to_feel: data.what_to_feel || '',
        what_to_avoid: data.what_to_avoid || '',
        red_flags: data.red_flags || '',
        equipment_requirements: data.equipment_requirements || ''
      });

      setEditedNotes(data.notes || '');
      setEditedVideoUrl(data.video_url || '');
    } catch (error) {
      console.error('Error fetching movement:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteMovement = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      navigate('/library');
    } catch (error) {
      console.error('Error deleting movement:', error);
    }
  };

  const handleUpdateNotes = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .update({ notes: editedNotes })
        .eq('id', id);

      if (error) throw error;

      setMovement(prev => ({ ...prev, notes: editedNotes }));
      setIsEditingNotes(false);
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .update({ 
          purpose: editedInfo.purpose,
          influences: editedInfo.influences,
          difficulty: editedInfo.difficulty,
          skill_demands: editedInfo.skill_demands,
          execution_requirements: editedInfo.execution_requirements
        })
        .eq('id', id);

      if (error) throw error;

      setMovement(prev => ({ 
        ...prev, 
        purpose: editedInfo.purpose,
        influences: editedInfo.influences,
        difficulty: editedInfo.difficulty,
        skill_demands: editedInfo.skill_demands,
        execution_requirements: editedInfo.execution_requirements
      }));
      setIsEditingInfo(false);
    } catch (error) {
      console.error('Error updating information:', error);
    }
  };

  const handleUpdateMechanics = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .update({ 
          joint_actions: editedMechanics.joint_actions,
          muscle_actions: editedMechanics.muscle_actions,
          biomechanics: editedMechanics.biomechanics
        })
        .eq('id', id);

      if (error) throw error;

      setMovement(prev => ({ 
        ...prev, 
        joint_actions: editedMechanics.joint_actions,
        muscle_actions: editedMechanics.muscle_actions,
        biomechanics: editedMechanics.biomechanics
      }));
      setIsEditingMechanics(false);
    } catch (error) {
      console.error('Error updating mechanics:', error);
    }
  };

  const handleUpdateVideo = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .update({ video_url: editedVideoUrl })
        .eq('id', id);

      if (error) throw error;

      setMovement(prev => ({ ...prev, video_url: editedVideoUrl }));
      setIsEditingVideo(false);
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handleUpdateInstructions = async () => {
    try {
      const { error } = await supabase
        .from('movements')
        .update({ 
          setup: editedInstructions.setup,
          instructions: editedInstructions.instructions,
          sets: editedInstructions.sets,
          reps: editedInstructions.reps,
          tempo: editedInstructions.tempo,
          breath: editedInstructions.breath,
          rest: editedInstructions.rest,
          cues: editedInstructions.cues,
          what_to_feel: editedInstructions.what_to_feel,
          what_to_avoid: editedInstructions.what_to_avoid,
          red_flags: editedInstructions.red_flags,
          equipment_requirements: editedInstructions.equipment_requirements
        })
        .eq('id', id);

      if (error) throw error;

      setMovement(prev => ({ 
        ...prev, 
        setup: editedInstructions.setup,
        instructions: editedInstructions.instructions,
        sets: editedInstructions.sets,
        reps: editedInstructions.reps,
        tempo: editedInstructions.tempo,
        breath: editedInstructions.breath,
        rest: editedInstructions.rest,
        cues: editedInstructions.cues,
        what_to_feel: editedInstructions.what_to_feel,
        what_to_avoid: editedInstructions.what_to_avoid,
        red_flags: editedInstructions.red_flags,
        equipment_requirements: editedInstructions.equipment_requirements
      }));
      setIsEditingInstructions(false);
    } catch (error) {
      console.error('Error updating instructions:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading movement...</div>;
  }

  if (!movement) {
    return <div className="text-center py-8 text-gray-400">Movement not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300">{movement.name}</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/library')}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Library
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Delete Movement
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <VideoSection
          videoUrl={movement.video_url || ''}
          isEditing={isEditingVideo}
          editedVideoUrl={editedVideoUrl}
          onEditClick={() => setIsEditingVideo(true)}
          onSave={handleUpdateVideo}
          onCancel={() => setIsEditingVideo(false)}
          onVideoUrlChange={(url) => setEditedVideoUrl(url)}
        />

        <InformationSection
          isEditing={isEditingInfo}
          onEditClick={() => setIsEditingInfo(true)}
          formData={{
            purpose: movement.purpose || '',
            influences: movement.influences || '',
            difficulty: movement.difficulty || '',
            skill_demands: movement.skill_demands || '',
            execution_requirements: movement.execution_requirements || ''
          }}
          onFormChange={(e) => setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          onSubmit={handleUpdateInfo}
          isExpanded={expandedSections.has('information')}
          onToggle={() => toggleSection('information')}
        />

        <InstructionsSection
          isEditing={isEditingInstructions}
          onEditClick={() => setIsEditingInstructions(true)}
          formData={{
            setup: movement.setup || '',
            instructions: movement.instructions || '',
            sets: movement.sets || '',
            reps: movement.reps || '',
            tempo: movement.tempo || '',
            breath: movement.breath || '',
            rest: movement.rest || '',
            cues: movement.cues || '',
            what_to_feel: movement.what_to_feel || '',
            what_to_avoid: movement.what_to_avoid || '',
            red_flags: movement.red_flags || '',
            equipment_requirements: movement.equipment_requirements || ''
          }}
          onFormChange={(e) => setEditedInstructions(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          onSubmit={handleUpdateInstructions}
          isExpanded={expandedSections.has('instructions')}
          onToggle={() => toggleSection('instructions')}
        />

        <MechanicsSection
          isEditing={isEditingMechanics}
          onEditClick={() => setIsEditingMechanics(true)}
          formData={{
            joint_actions: movement.joint_actions || '',
            muscle_actions: movement.muscle_actions || '',
            biomechanics: movement.biomechanics || ''
          }}
          onFormChange={(e) => setEditedMechanics(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          onSubmit={handleUpdateMechanics}
          isExpanded={expandedSections.has('mechanics')}
          onToggle={() => toggleSection('mechanics')}
        />

        <NotesSection
          isEditing={isEditingNotes}
          onEditClick={() => setIsEditingNotes(true)}
          formData={{
            coaching_notes: movement.notes || '',
            technical_notes: movement.technical_notes || ''
          }}
          onFormChange={(e) => setEditedNotes(e.target.value)}
          onSubmit={handleUpdateNotes}
          isExpanded={expandedSections.has('notes')}
          onToggle={() => toggleSection('notes')}
        />
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal
          movementName={movement.name}
          onConfirm={handleDeleteMovement}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
