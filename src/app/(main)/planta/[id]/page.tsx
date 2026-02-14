// src/app/(main)/plants/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { usePlant } from '@/hooks/usePlant';
import { PlantHero } from '@/components/plants/PlantHero';
import { CareGrid } from 'components/plants/CareGrid';
import { PlantingRecomend } from 'components/plants/PlantingRecomend';
import { StockWarning } from 'components/plants/StockWarning';
import { DeliveryCalendar } from '@/components/plants/DeliveryCalendar';
import { ActionFooter } from '@/components/plants/ActionFooter';

export default function PlantDetailPage() {
  // El ID que viene en la URL (ej: /plants/5)
  

  const params = useParams();

  console.log("Parámetros de la URL:", params.id); // Debug
  const { planta, loading, error } = usePlant(params.id);

  

  if (loading || !planta) return null;

  return (
    <main className="min-h-screen bg-background-light detalle-planta">
      <PlantHero imagenUrl={planta.imageUrl || ''} categoria={planta.ubicacion} />
      
      {/* Sección de Título y Badge Dinámico */}
      <div className="px-4 pt-4 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-primary text-[32px] font-bold leading-tight">{planta.name}</h1>
          <p className="text-sm text-zinc-500 italic">{planta.description}</p>
        </div>
        <div className={`flex h-8 items-center gap-x-2 rounded-full px-3 border ${
          planta.stock > 0 ? "bg-primary/10 border-primary/20" : "bg-zinc-100 border-zinc-200"
        }`}>
          <div className={`size-2 rounded-full ${planta.stock > 0 ? "bg-primary animate-pulse" : "bg-zinc-400"}`}></div>
          <p className={`text-[10px] font-bold uppercase ${planta.stock > 0 ? "text-primary" : "text-zinc-500"}`}>
            {planta.stock > 0 ? 'En Stock' : 'Sin Stock'}
          </p>
        </div>
      </div>

      {/* Nuevo Banner de Reabastecimiento */}
      <StockWarning planta={planta} />

      <CareGrid planta={planta} />
      <PlantingRecomend planta={planta} />

      {/* Programar Pedido con nota de stock */}
      <div className="px-4 pt-6 flex justify-between items-end">
        <h2 className="text-[#121716] text-xl font-bold italic">Programar Pedido</h2>
        {planta.stock === 0 && (
          <span className="text-[10px] font-bold text-amber-600 uppercase">* Sujeto a reposición</span>
        )}
      </div>
      <DeliveryCalendar />
      <ActionFooter planta={planta} />
      
      <div className='h-40'></div>
    </main>
  );
}