import { supabase } from '@/lib/supabase';
import { Planta } from '@/types';

export const plantsService = {
  async getAll(categoria?: string): Promise<Planta[]> {
    try {
      let query = supabase
        .from('plantas')
        .select('*')
        // 'puntuacion' es el nombre de tu columna
        // { ascending: false } equivale al DESC de SQL
        .order('puntuacion', { ascending: true });

      if (categoria && categoria !== 'Todo') {
        query = query.eq('ubicacion', categoria); 
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error("Error al obtener plantas:", err);
      return [];
    }
  },
  async getById(id: number): Promise<Planta | null> {
    const { data, error } = await supabase
      .from('plantas')
      .select('*')
      .eq('id', id)
      .single(); // Trae solo un objeto, no un arreglo

    if (error) return null;
    return data;
  }
};