import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const Movements = () => {
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <div className={`container flex flex-col items-center justify-center ${isPortrait ? 'py-4' : 'py-12'}`}>
      <h1 className={`${isPortrait ? 'text-2xl' : 'text-3xl'} font-bold mb-4`}>Movements</h1>
      <div className={`flex flex-col space-y-${isPortrait ? '2' : '4'} w-full max-w-md`}>
        <Link 
          className="touch-target bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-lg text-lg font-semibold text-center transition-colors flex items-center justify-center" 
          to="/add-movement"
        >
          Add Movement
        </Link>
        <Link 
          className="touch-target bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg text-lg font-semibold text-center transition-colors flex items-center justify-center" 
          to="/movement-index"
        >
          Movement Index
        </Link>
        <Link 
          className="touch-target bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg text-lg font-semibold text-center transition-colors flex items-center justify-center" 
          to="/movement-archive"
        >
          Movement Archive
        </Link>
      </div>
    </div>
  );
};

export default Movements;
