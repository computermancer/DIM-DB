import { supabase } from '../config/supabase';

export const fetchMovements = async () => {
  const { data, error } = await supabase.from('movements').select('*');
  if (error) throw error;
  return data;
};

export const updateMovement = async (movementId, updatedData) => {
  const { error } = await supabase
    .from('movements')
    .update(updatedData)
    .eq('id', movementId);
  if (error) throw error;
};

export const deleteMovementById = async (movementId) => {
  const { error } = await supabase
    .from('movements')
    .delete()
    .eq('id', movementId);
  if (error) throw error;
};
