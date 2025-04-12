import { supabase } from '../config/supabase';

export const fetchDrills = async () => {
  const { data, error } = await supabase.from('drills').select('*');
  if (error) throw error;
  return data;
};

export const updateDrill = async (drillId, updatedData) => {
  const { error } = await supabase
    .from('drills')
    .update(updatedData)
    .eq('id', drillId);
  if (error) throw error;
};

export const deleteDrillById = async (drillId) => {
  const { error } = await supabase
    .from('drills')
    .delete()
    .eq('id', drillId);
  if (error) throw error;
};
