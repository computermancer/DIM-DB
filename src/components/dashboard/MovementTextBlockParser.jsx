import React from 'react';

const MovementTextBlockParser = ({ textBlock, setTextBlock, parseTextBlock }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <h3 className="text-lg font-medium mb-2 text-blue-400">Paste Full Movement Block</h3>
      <div className="bg-zinc-700 rounded-lg p-2 text-gray-300 border border-white/10">
        <textarea
          className="w-full bg-zinc-700 text-white rounded-lg p-2 text-gray-300 border border-white/10"
          value={textBlock}
          onChange={(e) => setTextBlock(e.target.value)}
          placeholder="Paste your movement block here (format: Key: Value, one per line)"
          style={{
            minHeight: '10rem',
            lineHeight: '1.5',
            resize: 'vertical',
            overflow: 'auto',
            WebkitAppearance: 'none'
          }}
          autoComplete="off"
        />
      </div>
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-200"
        onClick={() => parseTextBlock()}
      >
        Parse Block
      </button>
    </div>
  );
};

export default MovementTextBlockParser;
