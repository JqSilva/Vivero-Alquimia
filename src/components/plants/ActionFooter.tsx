/* src/components/plants/ActionFooter */

'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plant } from '@/core/entities/Plant';

export const ActionFooter = ({ planta }: { planta: Plant }) => {
  const [cantidad, setCantidad] = useState(1);
  
  // Extraemos addToCart para guardar y fechaEntrega para saber qué eligió el usuario
  const { addToCart, fechaEntrega } = useCart(); 
  
  const sinStock = planta.stock === 0; 
  const precioFinal = sinStock ? (planta.price * 0.3) : planta.price; 

  const manejarClick = () => {
    // === PRINTS DE CONTROL (Debug) ===
    console.log("--- PROCESANDO AÑADIR AL CARRITO ---");
    console.log("🌿 Planta:", planta.name);
    console.log("📅 Fecha de Entrega desde el Contexto:", fechaEntrega);
    console.log("🔢 Cantidad:", cantidad);
    console.log("💰 ¿Es encargo (30%)?:", sinStock ? "SÍ" : "NO");
    console.log("------------------------------------");

    // Añadimos al carrito la cantidad de veces seleccionada
    addToCart(planta, cantidad);

    alert(`¡Listo! ${planta.name} añadido. Entrega programada para: ${fechaEntrega}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] mx-auto w-full max-w-[480px] rounded-t-[32px] border-t border-zinc-100 bg-white/95 p-6 pb-10 shadow-[0_-12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="flex flex-col gap-6">
        
        {/* Selector de Cantidad - Más equilibrado */}
        <div className="flex items-center justify-between bg-zinc-50/50 p-2 rounded-2xl border border-zinc-100/50">
          <div className="flex items-center gap-2 pl-2">
            <span className="material-symbols-outlined text-zinc-400 text-lg"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Cantidad</span>
          </div>
          
          <div className="flex items-center gap-4 rounded-xl bg-white p-1.5 shadow-sm border border-zinc-100">
            <button 
              onClick={() => setCantidad(Math.max(1, cantidad - 1))} 
              className="flex size-8 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 transition-colors active:bg-zinc-200 disabled:opacity-30"
              disabled={cantidad <= 1}
            >
              <span className="material-symbols-outlined !text-lg">remove</span>
            </button>
            
            <span className="w-6 text-center text-base font-heavy text-zinc-800">{cantidad}</span>
            
            <button 
              onClick={() => setCantidad(cantidad + 1)} 
              className="flex size-8 items-center justify-center rounded-xl bg-primary/30 text-primary transition-colors active:bg-primary/20"
            >
              <span className="material-symbols-outlined !text-lg">add</span>
            </button>
          </div>
        </div>

        {/* Info de Precio y Acción Principal */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {sinStock ? 'Seña de Encargo' : 'Total Estimado'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-primary">$</span>
              <span className="text-2xl font-black tracking-tight text-primary">
                {(precioFinal * cantidad).toLocaleString('es-CL')}
              </span>
            </div>
          </div>

          <button 
            onClick={manejarClick}
            className={`group relative flex h-14 flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              sinStock 
                ? "bg-zinc-900 shadow-zinc-200" 
                : "bg-primary shadow-primary/25"
            }`}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
              {sinStock ? 'priority_high' : 'shopping_bag'}
            </span>
            <span className="text-sm tracking-wide">
              {sinStock ? 'Encargar ahora' : 'Añadir al carrito'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};