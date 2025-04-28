import React from 'react';
import { Link } from 'react-router-dom';

export function MovementIndexCard({ movement }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors duration-200">
      <h3 className="text-xl font-semibold text-orange-400 mb-4">{movement.name}</h3>
      <Link
        to={`/movements/${movement.id}`}
        className="block w-full bg-zinc-700 hover:bg-zinc-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 text-center"
      >
        View Movement Details
      </Link>
    </div>
  );
}
