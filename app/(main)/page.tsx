'use client';
import { useState, useEffect, useMemo } from 'react';
import { plantsService } from '@/services/plants.service';
import { PlantCard } from '@/components/plants/PlantCard';
import { SearchBar } from '@/components/layout/SearchBar';
import { CategoryChips } from '@/components/plants/CategoryChips';
import { Planta } from '@/types';



export default function HomePage() {
  const [allPlants, setAllPlants] = useState<Planta[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);



  // 1. Carga inicial desde Supabase/Docker
  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await plantsService.getAll();
        setAllPlants(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlants();
  }, []);

  // 2. Lógica de filtrado combinada (Categoría + Nombre)
  const filteredPlants = useMemo(() => {
    return allPlants.filter((planta) => {
      // Filtro por categoría
      const matchesCategory = 
        activeCategory === 'Todo' || 
        planta.ubicacion === activeCategory || // Si filtras por Interior/Exterior
        (activeCategory === 'Suculentas' && planta.categoria_id === 4); // Ejemplo por ID

      // Filtro por nombre
      const matchesSearch = planta.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, allPlants]);

  return (
    <main className="pb-24">
      <div className="max-w-6xl mx-auto">
        <SearchBar onSearch={setSearchTerm} />

        <CategoryChips 
          selectedCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h3 className="text-xl font-bold tracking-tight">
            {activeCategory === 'Todo' ? 'Nuestras Plantas' : activeCategory}
          </h3>
          <span className="text-sm font-semibold text-primary">{filteredPlants.length} resultados</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4">
            {filteredPlants.map((planta) => (
              <PlantCard key={planta.id} planta={planta} />
            ))}
            
            {filteredPlants.length === 0 && (
              <div className="col-span-full text-center py-20 opacity-50">
                <span className="material-symbols-outlined text-5xl">potted_plant</span>
                <p className="mt-2">No encontramos lo que buscas</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}