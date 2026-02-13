// src/data/repositories/PlantRepository.ts
import { supabase } from '@/lib/supabase';

import { Plant } from '@/core/entities/Plant';

export const plantRepository = {
    async getAllPlants(): Promise<Plant[]> {
        const { data, error } = await supabase.from('plantas').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data.map((item) => ({
            id: item.id,
            name: item.nombre,
            price: item.precio,
            imageUrl: item.imagen_url,
            isFavorite: false, // Default value, can be set based on user preferences
            rating: item.puntuacion || 0 // Default rating is 0 if not set
        }));
    },
    async getPlantById(id: number): Promise<Plant> {
        const { data, error } = await supabase.from('plantas').select('*').eq('id', id).single();
        if (error) {
            throw new Error(error.message);
        }
        return {
            id: data.id,
            name: data.nombre,
            price: data.precio,
            imageUrl: data.imagen_url,
            isFavorite: false, // Default value, can be set based on user preferences
            rating: data.puntuacion || 0, // Default rating is 0 if not set
            ubicacion: data.ubicacion || undefined, // Default undefined if not set
            stock: data.stock || 0, // Default stock is 0 if not set
            description: data.descripcion || undefined // Default undefined if not set
        };
    }
};