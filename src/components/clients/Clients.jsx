import React from 'react';
import { useMediaQuery } from '@mui/material';

const Clients = () => {
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <div className={`container flex flex-col items-center justify-center ${isPortrait ? 'py-4' : 'py-12'}`}>
      <h1 className={`${isPortrait ? 'text-2xl' : 'text-3xl'} font-bold mb-4`}>Clients</h1>
      <div className={`flex flex-col space-y-${isPortrait ? '2' : '4'} w-full max-w-md`}>
        <div className="touch-target bg-white p-6 rounded-lg shadow-md w-full">
          <p className="text-gray-700 text-lg">Client management page coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
