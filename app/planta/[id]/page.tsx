'use client';
import { useParams } from 'next/navigation';
import { usePlanta } from '@/hooks/usePlanta'; // Importamos tu nuevo hook
import { PlantHero } from '@/components/plants/PlantHero';

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
    <main className="bg-background-light text-[#121716] transition-colors duration-300">
      <PlantHero 
        imagenUrl={planta.imagen_url || ''} 
        categoria={planta.ubicacion} 
      />
      
      {/* Aquí irán los siguientes componentes que modularicemos */}
      <div className="px-4 py-2">
         <h1 className="text-3xl font-bold text-primary">{planta.nombre}</h1>
      </div>
    </main>
  );
}