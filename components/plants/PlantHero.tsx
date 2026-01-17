// src/components/plants/CareGrid.tsx
'use client';

import { useRouter } from 'next/navigation';

interface PlantHeroProps {
  imagenUrl: string;
  categoria: string;
  esPremium?: boolean;
}

export const PlantHero = ({ imagenUrl, categoria, esPremium = true }: PlantHeroProps) => {
  const router = useRouter();

  return (
    <>
      {/* TopAppBar - Integrado en el Hero para mantener la estructura visual */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
          onClick={() => router.back()}
          className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <h2 className="text-[#121716] text-xs font-bold leading-tight flex-1 text-center uppercase tracking-[0.2em]">
          Nursery Edition
        </h2>

        <div className="flex w-10 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm text-primary active:scale-90 transition-transform">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>

      {/* HeaderImage (Hero Section) */}
      <div className="px-4 py-3">
        <div 
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[420px] shadow-2xl animate-in fade-in zoom-in duration-700"
          style={{ backgroundImage: `url("${imagenUrl}")` }}
        >
          <div className="bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
            <div className="flex gap-2 mb-2">
              {esPremium && (
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Premium
                </span>
              )}
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                {categoria}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};