import React from 'react';
import { expandTextArea } from './MovementUtils';

const MovementMechanicsSection = ({ newMovement, setNewMovement }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Mechanics</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Stance</label>
          <textarea
            name="stance"
            value={newMovement.stance}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the stance"
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
          <label className="text-lg font-semibold mb-2 block">Chain Type</label>
          <textarea
            name="chain_type"
            value={newMovement.chain_type}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the chain type"
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
          <label className="text-lg font-semibold mb-2 block">Plane</label>
          <textarea
            name="plane"
            value={newMovement.plane}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the movement plane"
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
          <label className="text-lg font-semibold mb-2 block">Movement Types</label>
          <textarea
            name="movement_types"
            value={newMovement.movement_types}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the movement types"
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
          <label className="text-lg font-semibold mb-2 block">Region</label>
          <textarea
            name="region"
            value={newMovement.region}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the region"
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
          <label className="text-lg font-semibold mb-2 block">System Impact</label>
          <textarea
            name="system_impact"
            value={newMovement.system_impact}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the system impact"
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
          <label className="text-lg font-semibold mb-2 block">Joints</label>
          <textarea
            name="joints"
            value={newMovement.joints}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the joints involved"
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
          <label className="text-lg font-semibold mb-2 block">Muscles</label>
          <textarea
            name="muscles"
            value={newMovement.muscles}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the muscles involved"
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
          <label className="text-lg font-semibold mb-2 block">Tendons</label>
          <textarea
            name="tendons"
            value={newMovement.tendons}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the tendons involved"
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
          <label className="text-lg font-semibold mb-2 block">Joint Movements</label>
          <textarea
            name="joint_actions"
            value={newMovement.joint_actions}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the joint movements"
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
          <label className="text-lg font-semibold mb-2 block">Nervous System</label>
          <textarea
            name="nervous_system"
            value={newMovement.nervous_system}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the nervous system involvement"
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
          <label className="text-lg font-semibold mb-2 block">Psychological</label>
          <textarea
            name="psychological"
            value={newMovement.psychological}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter the psychological aspects"
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

export default MovementMechanicsSection;
