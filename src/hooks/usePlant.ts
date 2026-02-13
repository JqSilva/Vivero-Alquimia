import { useState, useEffect } from 'react';
import { plantRepository } from '@/data/repositories/PlantRepository';
import { Plant } from '@/core/entities/Plant';

export function usePlant(id: string) {
  const [planta, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay ID, no hacemos nada
    if (!id) return;

    const loadPlant = async () => {
      try {
        setLoading(true);
        const data = await plantRepository.getPlantById(Number(id));
        if (!data) {
          setError('La planta no existe.');
        } else {
          setPlant(data);
        }
      } catch (err) {
        setError('Error al cargar la planta.');
      } finally {
        setLoading(false);
      }
    };

    loadPlant();
  }, [id]); // Se vuelve a ejecutar si el ID cambia

  return { planta, loading, error };
}