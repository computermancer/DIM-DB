import React from 'react';
import { expandTextArea } from './MovementUtils';

const MovementInfoSection = ({ newMovement, setNewMovement }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Info</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Name *</label>
          <textarea
            name="name"
            value={newMovement.name}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the name of the movement"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Purpose *</label>
          <textarea
            name="purpose"
            value={newMovement.purpose}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the purpose of the movement"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Movement Type *</label>
          <textarea
            name="movement_type"
            value={newMovement.movement_type}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the movement type"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Difficulty *</label>
          <textarea
            name="difficulty"
            value={newMovement.difficulty}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the difficulty level"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Skill Demands *</label>
          <textarea
            name="skill_demands"
            value={newMovement.skill_demands}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the skill demands"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Influences *</label>
          <textarea
            name="influences"
            value={newMovement.influences}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter any influences"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Execution Requirements *</label>
          <textarea
            name="execution_requirements"
            value={newMovement.execution_requirements}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the execution requirements"
            style={{
              minHeight: '4rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              WebkitAppearance: 'none'
            }}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default MovementInfoSection;
