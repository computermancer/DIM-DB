import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function MovementDetailsSimple() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movement, setMovement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState(new Set(['information']));

  useEffect(() => {
    fetchMovement();
  }, [id]);

  const fetchMovement = async () => {
    try {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setMovement(data);
    } catch (error) {
      console.error('Error fetching movement:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const renderBulletPoints = (text) => {
    if (!text) return <p className="text-gray-400">No content available</p>;
    return text.split('\n').map((point, index) => (
      <li key={index} className="text-gray-300 mb-2">{point.trim()}</li>
    ));
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading movement...</div>;
  }

  if (!movement) {
    return <div className="text-center py-8 text-gray-400">Movement not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300">{movement.name}</h1>
        <button
          onClick={() => navigate('/library')}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Back to Library
        </button>
      </div>

      <div className="space-y-6">
        {/* Information Section */}
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('information')}
          >
            <h3 className="text-xl font-semibold text-gray-300">Information</h3>
            {expandedSections.has('information') ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {expandedSections.has('information') && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Purpose</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.purpose)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Difficulty</h4>
                <p className="text-gray-300">{movement.difficulty || 'No difficulty specified'}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Skill Demands</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.skill_demands)}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('instructions')}
          >
            <h3 className="text-xl font-semibold text-gray-300">Instructions</h3>
            {expandedSections.has('instructions') ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {expandedSections.has('instructions') && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Setup</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.setup)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Execution</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.instructions)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Programming</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Sets</p>
                    <p className="text-gray-300">{movement.sets || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Reps</p>
                    <p className="text-gray-300">{movement.reps || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Tempo</p>
                    <p className="text-gray-300">{movement.tempo || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rest</p>
                    <p className="text-gray-300">{movement.rest || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mechanics Section */}
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('mechanics')}
          >
            <h3 className="text-xl font-semibold text-gray-300">Mechanics</h3>
            {expandedSections.has('mechanics') ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {expandedSections.has('mechanics') && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Joint Actions</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.joint_actions)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Muscle Actions</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.muscle_actions)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">Biomechanics</h4>
                <ul className="list-disc pl-6">
                  {renderBulletPoints(movement.biomechanics)}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('notes')}
          >
            <h3 className="text-xl font-semibold text-gray-300">Notes</h3>
            {expandedSections.has('notes') ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {expandedSections.has('notes') && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-400 mb-2">Coaching Notes</h4>
              <ul className="list-disc pl-6">
                {renderBulletPoints(movement.notes)}
              </ul>
            </div>
          )}
        </div>

        {/* Video Section */}
        {movement.video_url && (
          <div className="bg-zinc-800 rounded-lg p-4 border border-white/10">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('video')}
            >
              <h3 className="text-xl font-semibold text-gray-300">Video</h3>
              {expandedSections.has('video') ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            {expandedSections.has('video') && (
              <div className="mt-4">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={movement.video_url}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
