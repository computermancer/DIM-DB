import React from 'react';
import ReactPlayer from 'react-player';
import { FaWindowClose } from 'react-icons/fa';

export function VideoSection({ 
  videoUrl, 
  onEditClick, 
  onPopupClick, 
  showPopup, 
  videoPosition, 
  isDragging, 
  dragOffset,
  onDragStart,
  onDrag,
  onDragEnd,
  onClose
}) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-300">Video</h3>
      </div>
      {videoUrl && (
        <div className="relative">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="300px"
            controls
            className="rounded-lg"
          />
          <button
            onClick={onPopupClick}
            className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
          >
            <FaWindowClose />
          </button>
        </div>
      )}
      <button
        onClick={onEditClick}
        className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-3 py-1 rounded-lg transition-colors duration-200"
      >
        {videoUrl ? 'Edit Video' : 'Add Video'}
      </button>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={onDragStart}
          onMouseMove={onDrag}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          <div
            className="bg-zinc-800 rounded-lg p-4 border border-white/10"
            style={{
              position: 'absolute',
              left: `${videoPosition.x}%`,
              top: `${videoPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-300">Video</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300"
              >
                <FaWindowClose size={24} />
              </button>
            </div>
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="300px"
              controls
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
