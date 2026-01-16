'use client';
import { useState, useEffect } from 'react';
import { plantsService } from '@/services/plants.service';
import { PlantCard } from '@/components/plants/PlantCard';
import { SearchBar } from '@/components/layout/SearchBar';
import { CategoryChips } from '@/components/plants/CategoryChips';
import { Planta } from '@/types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar plantas cuando cambie la categoría
  useEffect(() => {
    const loadPlants = async () => {
      setLoading(true);
      try {
        // Aquí pasamos la categoría al servicio para filtrar desde la DB
        const data = await plantsService.getAll(activeCategory);
        setPlantas(data);
      } catch (error) {
        console.error("Error al cargar plantas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlants();
  }, [activeCategory]); // Se ejecuta cada vez que haces clic en un Chip

  return (
    <main>
      <div className="max-w-6xl mx-auto">
        <SearchBar />

        <CategoryChips 
          selectedCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        {/* Section Header (de tu diseño original) */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h3 className="text-xl font-bold tracking-tight">Nuestras Plantas</h3>
          <button className="text-sm font-semibold text-primary">Ver todas</button>
        </div>

        {/* Grid de Plantas */}
        {loading ? (
          <div className="text-center py-10">Cargando plantas...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 pb-24">
            {plantas.length > 0 ? (
              plantas.map((planta) => (
                <PlantCard key={planta.id} planta={planta} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500">No encontramos plantas en esta categoría.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}