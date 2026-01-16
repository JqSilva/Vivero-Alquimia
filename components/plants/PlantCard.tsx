import { Planta } from '@/types';

interface Props {
  planta: Planta;
}

export const PlantCard = ({ planta }: Props) => {
  const tieneStock = planta.stock > 0;

  return (
    <div className="flex flex-col gap-3 group">
      {/* Imagen (puedes usar un placeholder por ahora) */}
      <div className="relative w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-2xl overflow-hidden shadow-sm"
        style={{ backgroundImage: `url(${planta.imagen_url || '/placeholder-plant.png'})` }}
      >
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary">Popular</span>
        <button className="absolute bottom-3 right-3 flex size-9 items-center justify-center bg-primary text-white rounded-full shadow-lg active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>
      <div className="px-1">
        <p className="text-sm font-bold leading-tight">{planta.nombre}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-primary font-bold">${planta.precio}</p>
          <div className="flex items-center gap-1">
            <span 
              className="material-symbols-outlined text-orange-400"
              style={{ 
                fontSize: '12px',      
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              star
            </span>
            <span className="text-[10px] font-medium opacity-60">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};