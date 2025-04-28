import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import MovementItem from './MovementItem';
import { DRILL_FIELDS } from '../../constants/movementFields';
import { useMediaQuery } from '@mui/material';

export function MovementDetails() {
  const { id } = useParams();
  const [movement, setMovement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isPortrait = useMediaQuery('(orientation: portrait)');

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
      setError('Failed to load movement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading movement...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-400">{error}</div>;
  }

  if (!movement) {
    return <div className="text-center py-8 text-gray-400">Movement not found</div>;
  }

  return (
    <div className={`container mx-auto px-4 ${isPortrait ? 'py-4' : 'py-8'}`}>
      <MovementItem
        movement={movement}
        setMovement={setMovement}
        editMode={false}
        editedMovement={null}
        onStartEdit={() => {}}
        onCancelEdit={() => {}}
        onSaveEdit={() => {}}
        onDelete={() => {}}
        onFieldEdit={() => {}}
        fields={DRILL_FIELDS}
        isPortrait={isPortrait}
      />
    </div>
  );
}
