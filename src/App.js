// DIM Dashboard - React + Tailwind + Supabase Starter (Now with Router + Layout Navigation)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DIMDashboard from './components/DIM-Dashboard';
import { MovementArchive } from './components/movements/MovementArchive';
import { MovementDetails } from './components/movements/MovementDetails';
import { MovementCategories } from './components/MovementCategories';
import { CaseStudies } from './components/CaseStudies';
import { Scenarios } from './components/Scenarios';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Link 
          className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/add"
        >
          Add Movements
        </Link>
        <Link 
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/archive"
        >
          Movement Archive
        </Link>
        <Link 
          className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/categories"
        >
          Movement Categories
        </Link>
        <Link 
          className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/case-studies"
        >
          Case Studies
        </Link>
        <Link 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/scenarios"
        >
          Scenarios
        </Link>
        <Link 
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/library"
        >
          Movement Library
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <nav className="bg-[#2c2c2c] p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-orange-400">DIM Dashboard</h1>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-orange-400">Home</Link>
              <Link to="/add" className="text-white hover:text-orange-400">Add Movement</Link>
              <Link to="/archive" className="text-white hover:text-orange-400">Movement Archive</Link>

            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<DIMDashboard />} />
            <Route path="/archive" element={<MovementArchive />} />
            <Route path="/movement/:id" element={<MovementDetails />} />
            <Route path="/categories" element={<MovementCategories />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/scenarios" element={<Scenarios />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
