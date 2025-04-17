import React from 'react';
import { expandTextArea } from './MovementUtils';

const MovementExecutionSection = ({ newMovement, setNewMovement }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Execution</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Equipment Requirements</label>
          <div className="relative w-full">
            <textarea
              name="equipment_requirements"
              value={newMovement.equipment_requirements}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter equipment requirements"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Equipment Alternatives</label>
          <div className="relative w-full">
            <textarea
              name="equipment_alternatives"
              value={newMovement.equipment_alternatives}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter equipment alternatives"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Setup</label>
          <div className="relative w-full">
            <textarea
              name="setup"
              value={newMovement.setup}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter setup instructions"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Instructions</label>
          <div className="relative w-full">
            <textarea
              name="instructions"
              value={newMovement.instructions}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter execution instructions"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Sets</label>
          <div className="relative w-full">
            <textarea
              name="sets"
              value={newMovement.sets}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter sets recommendations"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Reps</label>
          <div className="relative w-full">
            <textarea
              name="reps"
              value={newMovement.reps}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter reps recommendations"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Tempo</label>
          <div className="relative w-full">
            <textarea
              name="tempo"
              value={newMovement.tempo}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter tempo recommendations"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Breath</label>
          <div className="relative w-full">
            <textarea
              name="breath"
              value={newMovement.breath}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter breathing recommendations"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Rest</label>
          <div className="relative w-full">
            <textarea
              name="rest"
              value={newMovement.rest}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter rest recommendations"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Cues</label>
          <div className="relative w-full">
            <textarea
              name="cues"
              value={newMovement.cues}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter coaching cues"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">What to Feel</label>
          <div className="relative w-full">
            <textarea
              name="what_to_feel"
              value={newMovement.what_to_feel}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter what to feel during the movement"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">What to Avoid</label>
          <div className="relative w-full">
            <textarea
              name="what_to_avoid"
              value={newMovement.what_to_avoid}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter what to avoid during the movement"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Red Flags</label>
          <div className="relative w-full">
            <textarea
              name="red_flags"
              value={newMovement.red_flags}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter red flags to watch for"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Regressions</label>
          <div className="relative w-full">
            <textarea
              name="regressions"
              value={newMovement.regressions}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter regression options"
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

        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Progressions</label>
          <div className="relative w-full">
            <textarea
              name="progressions"
              value={newMovement.progressions}
              onChange={(e) => {
                handleInputChange(e);
                expandTextArea(e.target);
              }}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter progression options"
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
    </div>
  );
};

export default MovementExecutionSection;
