import { supabase } from '../src/config/supabase';

async function deleteMovements() {
  try {
    const { error } = await supabase
      .from('movements')
      .delete();

    if (error) throw error;
    
    console.log('All movements have been successfully deleted from the database.');
  } catch (err) {
    console.error('Error deleting movements:', err.message);
  }
}

deleteMovements();
