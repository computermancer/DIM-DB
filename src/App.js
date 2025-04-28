// DIM Dashboard - React + Tailwind + Supabase Starter (Now with Router + Layout Navigation)

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import DIMDashboard from './components/dashboard/DIM-Dashboard';
import { MovementArchiveAll } from './components/movements/MovementArchiveAll';
import { MovementDetails } from './components/movements/MovementDetails';
import { MovementCategories } from './components/movements/MovementCategories';
import { CaseStudies } from './components/scenarios/CaseStudies';
import { Scenarios } from './components/scenarios/Scenarios';
import { MovementIndex } from './components/movements/MovementIndex';
import { MovementDetailsSimple } from './components/movements/MovementDetailsSimple';
import MainNavbar from './components/MainNavbar';
import Clients from './components/clients/Clients';
import Movements from './components/movements/Movements';

function Layout() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <MainNavbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Link 
          className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/add-movement"
        >
          Add Movements
        </Link>
        <Link 
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold text-center transition-colors" 
          to="/movement-index"
        >
          Movement Index
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
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/movements',
        element: <Movements />
      },
      {
        path: '/add-movement',
        element: <DIMDashboard />
      },
      {
        path: '/movement-index',
        element: <MovementIndex />
      },
      {
        path: '/movement-archive',
        element: <MovementArchiveAll />
      },
      {
        path: '/clients',
        element: <Clients />
      },
      {
        path: '/movements/:id',
        element: <MovementDetails />
      },
      {
        path: '/categories',
        element: <MovementCategories />
      },
      {
        path: '/case-studies',
        element: <CaseStudies />
      },
      {
        path: '/scenarios',
        element: <Scenarios />
      },
      {
        path: '/movement/:id',
        element: <MovementDetailsSimple />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default function App() {
  return <RouterProvider router={router} />;
}
