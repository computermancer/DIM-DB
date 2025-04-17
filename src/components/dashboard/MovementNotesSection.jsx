import React from 'react';
import { expandTextArea } from './MovementUtils';

const MovementNotesSection = ({ newMovement, setNewMovement }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 mt-8">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Notes</h3>
      <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
        <label className="text-lg font-semibold mb-2 block">Additional Notes</label>
        <div className="relative w-full">
          <textarea
            name="notes"
            value={newMovement.notes}
            onChange={(e) => {
              handleInputChange(e);
              expandTextArea(e.target);
            }}
            className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
            placeholder="Enter any additional notes or considerations"
            style={{
              minHeight: '12rem',
              lineHeight: '1.5',
              resize: 'vertical',
              overflow: 'auto',
              '&::-webkit-resizer': {
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                width: '8px',
                height: '8px',
                cursor: 'ns-resize'
              }
            }}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default MovementNotesSection;
