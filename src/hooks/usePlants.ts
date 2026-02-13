// src/hooks/usePlants.ts
import { useState, useEffect } from 'react';
import { plantRepository } from '@/data/repositories/PlantRepository';
import { Plant } from '@/core/entities/Plant';
import { refresh } from 'next/cache';


export const usePlants = () => {

    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const loadPlants = async () => {
        try {
            setLoading(true);
            const data = await plantRepository.getAllPlants();
            setPlants(data);
        } catch (err) {
            setError((err as Error).message || 'Error al cargar las plantas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlants();
    }, []);

    return {
        plants,
        loading,
        error,
        refresh: loadPlants
    };
}

