// app/(main)/page.tsx
'use client';
import { usePlants } from "@/hooks/usePlants";
import { PlantCard } from "@/components/plants/PlantCard";
import { CategoryChips } from "@/components/Home/chips";

import { SearchBar } from '@/components/home/SearchBar';
import Link from "next/dist/client/link";
import { useState } from "react";

export default function HomePage() {
    const { plants, loading, error } = usePlants();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    
    

    if (error) {
        return <p>Error: {error}</p>;
    }

    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || plant.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto shadow-2xl bg-background-light">
            <header className="sticky top-0 z-50 bg-background-light/80  backdrop-blur-md px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
                    <span className="material-symbols-outlined !text-2xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>menu</span>
                    </button>
                </div>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">Alquimia</h1>
                    <div className="flex items-center gap-1">
                    <Link className="relative flex size-10 items-center justify-center rounded-full hover:bg-black/5  transition-colors" href='/cart'>
                        <span className="material-symbols-outlined !text-2xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>shopping_bag</span>
                    </Link>
                    </div>
            </header>
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
            <div>
                <SearchBar onSearch={setSearch} />
                <CategoryChips selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                
                <div className="flex items-center justify-between px-4 pb-2">
                    <h3 className="text-xl font-bold tracking-tight">Nuestras Plantas</h3>
                    <button className="text-sm font-semibold text-primary">Ver Todas</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 p-4">
                    {filteredPlants.map((planta) => (
                        <PlantCard key={planta.id} plant={planta} />
                    ))}
                </div>
            </div>
            )}
        </main>
    );
}