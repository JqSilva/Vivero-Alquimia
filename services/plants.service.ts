import { supabase } from '@/lib/supabase';
import { Planta } from '@/types';

export const plantsService = {
  async getAll(categoria?: string) {
  let query = supabase.from('plantas').select('*');
  
  if (categoria && categoria !== 'Todo') {
    query = query.eq('categoria', categoria); // Asegúrate que la columna se llame así en tu DB
  }
  
  const { data } = await query;
  return data || [];
},

  /**
   * Obtiene el detalle de una sola planta por su ID
   */
  async getById(id: number): Promise<Planta | null> {
    const { data, error } = await supabase
      .from('plantas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Planta;
  }
};