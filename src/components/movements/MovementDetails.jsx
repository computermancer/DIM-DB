import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import ReactPlayer from 'react-player';
import { FaWindowClose } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

export function MovementDetails() {
  // Helper functions
  const getBulletPoints = (content) => {
    if (!content) return ['No content available'];
    return content.split('.').map(item => item.trim()).filter(item => item);
  };

  const getCommaSeparatedItems = (content) => {
    if (!content) return ['No content available'];
    return content.split(',').map(item => item.trim()).filter(item => item);
  };

  const { id } = useParams();
  const [movement, setMovement] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState(['information']); // Initialize with information section expanded
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

  const contentSections = [
    {
      id: 'video',
      title: 'Video',
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Video</h3>
          </div>
          {movement?.video_url && (
            <div className="relative">
              <ReactPlayer
                url={movement.video_url}
                width="100%"
                height="300px"
                controls
                className="rounded-lg"
              />
              <button
                onClick={() => setShowVideoPopup(true)}
                className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
              >
                <FaWindowClose />
              </button>
            </div>
          )}
          <button
            onClick={() => setShowEditModal(true)}
            className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
          >
            {movement?.video_url ? 'Edit Video' : 'Add Video'}
          </button>
        </div>
      )
    },
    {
      id: 'instructions',
      title: 'Instructions',
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Instructions</h3>
            <button
              onClick={() => setEditInstructions(!editInstructions)}
              className="bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              {editInstructions ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editInstructions ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateInstructions(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Setup</label>
                  <textarea
                    name="setup"
                    value={instructionsForm.setup}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Instructions</label>
                  <textarea
                    name="instructions"
                    value={instructionsForm.instructions}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Set</label>
                  <textarea
                    name="set"
                    value={instructionsForm.set}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Reps</label>
                  <textarea
                    name="reps"
                    value={instructionsForm.reps}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Tempo</label>
                  <textarea
                    name="tempo"
                    value={instructionsForm.tempo}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Breath</label>
                  <textarea
                    name="breath"
                    value={instructionsForm.breath}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Rest</label>
                  <textarea
                    name="rest"
                    value={instructionsForm.rest}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Cues</label>
                  <textarea
                    name="cues"
                    value={instructionsForm.cues}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">What to Feel</label>
                  <textarea
                    name="what_to_feel"
                    value={instructionsForm.what_to_feel}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">What to Avoid</label>
                  <textarea
                    name="what_to_avoid"
                    value={instructionsForm.what_to_avoid}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Red Flags</label>
                  <textarea
                    name="red_flags"
                    value={instructionsForm.red_flags}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Equipment Requirements</label>
                  <textarea
                    name="equipment_requirements"
                    value={instructionsForm.equipment_requirements}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Equipment Alternatives</label>
                  <textarea
                    name="equipment_alternatives"
                    value={instructionsForm.equipment_alternatives}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Regressions</label>
                  <textarea
                    name="regressions"
                    value={instructionsForm.regressions}
                    onChange={handleInstructionsChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="3"
                  />
                </div>
                <div className="col-span-1">
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
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Setup</h4>
                <p className="text-gray-300">{movement?.setup}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Instructions</h4>
                <p className="text-gray-300">{movement?.instructions}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Set</h4>
                <p className="text-gray-300">{movement?.set}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Reps</h4>
                <p className="text-gray-300">{movement?.reps}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Tempo</h4>
                <p className="text-gray-300">{movement?.tempo}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Breath</h4>
                <p className="text-gray-300">{movement?.breath}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Rest</h4>
                <p className="text-gray-300">{movement?.rest}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Cues</h4>
                <p className="text-gray-300">{movement?.cues}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">What to Feel</h4>
                <p className="text-gray-300">{movement?.what_to_feel}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">What to Avoid</h4>
                <p className="text-gray-300">{movement?.what_to_avoid}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Red Flags</h4>
                <p className="text-gray-300">{movement?.red_flags}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Equipment Requirements</h4>
                <p className="text-gray-300">{movement?.equipment_requirements}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Equipment Alternatives</h4>
                <p className="text-gray-300">{movement?.equipment_alternatives}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Regressions</h4>
                <p className="text-gray-300">{movement?.regressions}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Progressions</h4>
                <p className="text-gray-300">{movement?.progressions}</p>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'notes',
      title: 'Notes',
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Notes</h3>
            <button
              onClick={() => setEditNotes(!editNotes)}
              className="bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              {editNotes ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editNotes ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateNotes(); }}>
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                  <label className="text-lg font-semibold mb-2 block">Notes</label>
                  <textarea
                    name="notes"
                    value={notesForm.notes}
                    onChange={handleNotesChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
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
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-2">Notes</h4>
                <p className="text-gray-300">{movement?.notes}</p>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'information',
      title: 'Information',
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Information</h3>
            <button
              onClick={() => setEditInformation(!editInformation)}
              className="bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              {editInformation ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editInformation ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateInformation(); }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Purpose - 4 columns */}
                <div className="col-span-4 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Purpose</label>
                  <textarea
                    name="purpose"
                    value={informationForm.purpose}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
                {/* Movement Type - 1 column */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Movement Type</label>
                  <textarea
                    name="movement_type"
                    value={informationForm.movement_type}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
                {/* Difficulty - 1 column */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Difficulty</label>
                  <textarea
                    name="difficulty"
                    value={informationForm.difficulty}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
                {/* Skill Demands - 1 column */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Skill Demands</label>
                  <textarea
                    name="skill_demands"
                    value={informationForm.skill_demands}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
                {/* Influences - 1 column */}
                <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Influences</label>
                  <textarea
                    name="influences"
                    value={informationForm.influences}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
                  />
                </div>
                {/* Execution Requirements - 4 columns */}
                <div className="col-span-4 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                  <label className="text-lg font-semibold mb-2 block">Execution Requirements</label>
                  <textarea
                    name="execution_requirements"
                    value={informationForm.execution_requirements}
                    onChange={handleInformationChange}
                    className="w-full bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10"
                    rows="4"
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
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Purpose - 4 columns */}
              <div className="col-span-4 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Purpose</h4>
                <p className="text-gray-300">{movement?.purpose}</p>
              </div>
              {/* Movement Type - 1 column */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Movement Type</h4>
                <p className="text-gray-300">{movement?.movement_type}</p>
              </div>
              {/* Difficulty - 1 column */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Difficulty</h4>
                <p className="text-gray-300">{movement?.difficulty}</p>
              </div>
              {/* Skill Demands - 1 column */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Skill Demands</h4>
                <p className="text-gray-300">{movement?.skill_demands}</p>
              </div>
              {/* Influences - 1 column */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Influences</h4>
                <p className="text-gray-300">{movement?.influences}</p>
              </div>
              {/* Execution Requirements - 4 columns */}
              <div className="col-span-4 row-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Execution Requirements</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {getCommaSeparatedItems(movement?.execution_requirements).map((item, index) => (
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
      title: 'Mechanics',
      content: (
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-300">Mechanics</h3>
            <button
              onClick={() => setEditMechanics(!editMechanics)}
              className="bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              {editMechanics ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editMechanics ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateMechanics(); }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Joints */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Joints</h4>
                <p className="text-gray-300">{movement?.joints}</p>
              </div>

              {/* Joint Actions */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Joint Actions</h4>
                <p className="text-gray-300">{movement?.joint_actions}</p>
              </div>

              {/* Muscles */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Muscles</h4>
                <p className="text-gray-300">{movement?.muscles}</p>
              </div>

              {/* Tendons */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Tendons</h4>
                <p className="text-gray-300">{movement?.tendons}</p>
              </div>

              {/* Nervous System */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Nervous System</h4>
                <p className="text-gray-300">{movement?.nervous_system}</p>
              </div>

              {/* Psychological */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">Psychological</h4>
                <p className="text-gray-300">{movement?.psychological}</p>
              </div>

              {/* System Impact */}
              <div className="col-span-1 bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
                <h4 className="text-lg font-semibold mb-2">System Impact</h4>
                <p className="text-gray-300">{movement?.system_impact}</p>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

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
    movement_type: '',
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

  // Initialize form state with current movement data
  React.useEffect(() => {
    if (movement) {
      setInformationForm({
        purpose: movement.purpose || '',
        difficulty: movement.difficulty || '',
        skill_demands: movement.skill_demands || '',
        influences: movement.influences || '',
        execution_requirements: movement.execution_requirements || ''
      });
      setInstructionsForm({
        setup: movement.setup || '',
        instructions: movement.instructions || '',
        set: movement.set || '',
        reps: movement.reps || '',
        tempo: movement.tempo || '',
        breath: movement.breath || '',
        rest: movement.rest || '',
        cues: movement.cues || '',
        what_to_feel: movement.what_to_feel || '',
        what_to_avoid: movement.what_to_avoid || '',
        red_flags: movement.red_flags || '',
        equipment_requirements: movement.equipment_requirements || '',
        equipment_alternatives: movement.equipment_alternatives || '',
        regressions: movement.regressions || '',
        progressions: movement.progressions || ''
      });
      setNotesForm({
        notes: movement.notes || ''
      });
      setMechanicsForm({
        mechanics: movement.mechanics || '',
        mechanics_notes: movement.mechanics_notes || '',
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
    }
  }, [movement]);

  React.useEffect(() => {
    const fetchMovement = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('movements')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMovement(data);
      } catch (error) {
        console.error('Error fetching movement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovement();
  }, [id]);

  // Handle video URL update
  const handleUpdateVideo = async () => {
    try {
      await supabase
        .from('movements')
        .update({ video_url: newVideoUrl })
        .eq('id', movement?.id);
      
      // Update local state
      setMovement(prev => prev ? { ...prev, video_url: newVideoUrl } : prev);
      
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

  // Handle movement deletion
  const handleDeleteMovement = async () => {
    try {
      await supabase
        .from('movements')
        .delete()
        .eq('id', movement?.id);

      // Redirect to movement list after deletion
      window.location.href = '/movements';
    } catch (error) {
      console.error('Error deleting movement:', error);
      alert('Failed to delete movement. Please try again.');
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
        .from('movements')
        .update(informationForm)
        .eq('id', movement?.id);
      
      // Update local state
      setMovement(prev => prev ? { ...prev, ...informationForm } : prev);
      
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
        .from('movements')
        .update(instructionsForm)
        .eq('id', movement?.id);
      
      // Update local state
      setMovement(prev => prev ? { ...prev, ...instructionsForm } : prev);
      
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
        .from('movements')
        .update({ notes: notesForm.notes })
        .eq('id', movement?.id);
      
      // Update local state
      setMovement(prev => prev ? { ...prev, notes: notesForm.notes } : prev);
      
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
        .from('movements')
        .update(mechanicsForm)
        .eq('id', movement?.id);
      
      // Update local state
      setMovement(prev => prev ? { ...prev, ...mechanicsForm } : prev);
      
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
        <div className="text-center py-8">Loading movement details...</div>
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
      {showVideoPopup && movement?.video_url && (
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
                url={movement.video_url}
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
            <p className="text-gray-300 mb-4">Are you sure you want to delete this movement? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMovement}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-300">{movement?.name}</h2>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaTrash className="w-4 h-4" />
            Delete Movement
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {reorderedButtons.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                expandedSections.includes(section.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto p-4">
        {contentSections.map((section) => (
          <div
            key={section.id}
            className={`mt-8 ${expandedSections.includes(section.id) ? 'block' : 'hidden'}`}
          >
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
