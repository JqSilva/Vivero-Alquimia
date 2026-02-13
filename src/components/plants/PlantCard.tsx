import { Plant } from '@/core/entities/Plant';
import Link from 'next/link';
import Image from 'next/image';

interface PlantCardProps {
  plant: Plant;
  onAddToCart?: (plant: Plant) => void; // Un evento (opcional)
}

export const PlantCard = ({ plant, onAddToCart }: PlantCardProps) => {

    const { id, name, price, imageUrl, rating} = plant;
  
  
  return (
    <div className="flex flex-col gap-3 group">
      {/* Imagen (puedes usar un placeholder por ahora) */}
      <Link href={`planta/${id}`}>
        <div className="relative w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-2xl overflow-hidden shadow-sm"
          style={{ backgroundImage: `url(${imageUrl || '/placeholder-plant.png'})` }}
        >
        </div>
      </Link>
      <div className="px-1">
        <p className="text-sm font-bold leading-tight">{name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-primary font-bold">${new Intl.NumberFormat('es-CL').format(price)}</p>
          <div className="flex items-center gap-1">
            <span 
              className="material-symbols-outlined !text-[14px] text-orange-400"
              style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              star
            </span>
            <span className="text-[12px] font-medium opacity-60">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};