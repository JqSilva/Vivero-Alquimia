'use client';
import { useParams } from 'next/navigation';
import { usePlanta } from '@/hooks/usePlanta'; // Importamos tu nuevo hook
import { PlantHero } from '@/components/plants/PlantHero';
import { CareGrid } from '@/components/plants/CareGrid';
import { PlantingRecomend } from '@/components/plants/PlantingRecomend';
import { DeliveryCalendar } from '@/components/plants/DeliveryCalendar';
import { ActionFooter } from '@/components/plants/ActionFooter';


export default function PlantaDetalle() {
  // useParams() obtiene el ID directamente de la URL de Next.js
  const params = useParams();
  const id = params?.id;

  // Usamos el hook pasándole el ID convertido a número
  const { planta, loading, error } = usePlanta(Number(id));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !planta) {
    return <div className="p-10 text-center text-red-500">{error || 'Planta no encontrada'}</div>;
  }

  return (
    <main className="min-h-screen bg-background-light text-[#121716] transition-colors duration-300 detalle-planta">
      <PlantHero 
        imagenUrl={planta.imagen_url || ''} 
        categoria={planta.ubicacion} 
      />
      
      {/* Aquí irán los siguientes componentes que modularicemos */}
      <div className="px-4 pt-4 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-primary tracking-tight text-[32px] font-bold leading-tight">
            {planta.nombre}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium italic">
            {planta.descripcion || 'Especie seleccionada - Vivero Alquimia'}
          </p>
        </div>

        {/* Contenedor del Badge de Stock */}
        <div className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-3 pr-3 border ${
          planta.stock > 0 
            ? "bg-primary/10 border-primary/20" 
            : "bg-red-100 border-red-200"
        }`}>
          {/* El puntito (ahora fuera del texto) */}
          <div className={`size-2 rounded-full ${
            planta.stock > 0 ? "bg-primary animate-pulse" : "bg-red-500"
          }`}></div>
          
          {/* El texto (al lado del puntito) */}
          <p className={`text-[10px] font-bold uppercase tracking-wider ${
            planta.stock > 0 ? "text-primary" : "text-red-600"
          }`}>
            {planta.stock > 0 ? 'En Stock' : 'Agotado'}
          </p>
        </div>
      </div>
      <div className='px-4 pt-8'>
        <h2 className="text-[#121716] text-xl font-bold leading-tight tracking-tight">Cuidados Especiales</h2>
      </div>

      <CareGrid planta={planta} />
      <PlantingRecomend planta={planta} />
      <DeliveryCalendar />
      
      <ActionFooter planta={planta} />
      <div className='h-36'></div>
    </main>
  );
}