// src/components/plants/CareGrid.tsx

import { Planta } from '@/types';

interface CareGridProps {
  planta: Planta;
}

export const CareGrid = ({ planta }: CareGridProps) => {
  const careItems = [
    { icon: 'opacity', label: 'Riego', value: planta.nivel_riego },
    { icon: 'wb_sunny', label: 'Luz', value: planta.nivel_luz },
    { icon: 'potted_plant', label: 'Suelo', value: 'Drenado' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {careItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
          <span className="material-symbols-outlined text-primary mb-2">{item.icon}</span>
          <p className="text-[10px] font-bold uppercase text-zinc-400">{item.label}</p>
          <p className="text-xs font-semibold text-center">{item.value}</p>
        </div>
      ))}
    </div>
  );
};