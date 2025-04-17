import React from 'react';

const MovementSubmitSection = ({ loading, showToast, setShowToast, toastType, setToastType }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className={`px-6 py-3 rounded-lg ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-600 hover:bg-orange-500'
        }`}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Movement'}
      </button>
    </div>
  );
};

export default MovementSubmitSection;
