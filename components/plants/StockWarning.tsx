// src/components/plants/StockWarning.tsx
import { Planta } from '@/types';

export const StockWarning = ({ planta }: { planta: Planta }) => {
  // Solo se muestra si no hay stock [cite: 58]
  if (planta.stock > 0) return null;

  return (
    <div className="px-4 pt-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-amber-600 text-xl">info</span>
        <div className="flex-1">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">Próximo reabastecimiento</p>
          <p className="text-sm text-amber-800 mt-1">
            Este ejemplar volverá a estar disponible en aproximadamente 
            <span className="font-bold underline decoration-dotted ml-1">
              {planta.dias_reabastecimiento || 7} días 
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};