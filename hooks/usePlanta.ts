'use client';
import { useState, useEffect } from 'react';
import { plantsService } from '@/services/plants.service';
import { Planta } from '@/types';

export const usePlanta = (id: number) => {
  const [planta, setPlanta] = useState<Planta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlanta = async () => {
      setLoading(true);
      try {
        const data = await plantsService.getById(id);
        if (data) {
          setPlanta(data);
        } else {
          setError('No se encontró la planta');
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanta();
  }, [id]);

  return { planta, loading, error };
};