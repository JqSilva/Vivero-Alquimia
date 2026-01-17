import { Planta } from '@/types';

interface props {
  planta: Planta;
}

export const PlantingRecomend = ({ planta }: props) => {
  return (
    <div className="px-4 py-4">
        <div className='bg-primary/5 rounded-xl p-5 border-primary/10 flex items-center gap-4'>
            <div className='size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
                <span className='material-symbols-outlined'>calendar_month</span>
            </div>
            <div>
                <h3 className='text-sm font-bold text-primary'>Fecha de Plantación</h3>
                <p className='text-xs text-zinc-600'>Recomendado: {planta.mes_plantacion ? `${planta.mes_plantacion} para un crecimiento óptimo.` : 'No especificada'}</p>
            </div>
        </div>
        
    </div>
  );
}