import React from 'react';
import { Link } from 'react-router-dom';

export function Scenarios() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-orange-400">Scenarios</h2>
      <div className="mb-6">
        <Link 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          to="/"
        >
          Back to Home
        </Link>
      </div>
      <p className="text-gray-400">Scenarios functionality coming soon...</p>
    </div>
  );
} 
