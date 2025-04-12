import React from 'react';

export default function ConfirmationModal({ onConfirm, onCancel, title, message }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold text-orange-400 mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button 
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
