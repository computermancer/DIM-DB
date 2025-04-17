import React from 'react';

const MovementVideoSection = ({ newMovement, setNewMovement }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Video</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:bg-zinc-700 transition-colors duration-200">
          <label className="text-lg font-semibold mb-2 block">Video URL</label>
          <div className="relative w-full">
            <textarea
              name="video_url"
              value={newMovement.video_url}
              onChange={handleInputChange}
              className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
              placeholder="Enter video URL"
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
  );
};

export default MovementVideoSection;
