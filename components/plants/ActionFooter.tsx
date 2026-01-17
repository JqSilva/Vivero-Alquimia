// src/components/plants/ActionFooter.tsx
'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Planta } from '@/types';

export const ActionFooter = ({ planta }: { planta: Planta }) => {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  return (
    // z-index alto para estar sobre el BottomNav
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white/95 backdrop-blur-md border-t border-zinc-100 z-[70] shadow-[0_-10px_20px_rgba(0,0,0,0,0.05)]">
      <div className="flex flex-col gap-3">
        
        {/* Fila 1: Selector de Cantidad (más pequeño) */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Cantidad</span>
          <div className="flex items-center gap-4 bg-zinc-100 rounded-lg p-1">
            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="size-7 flex items-center justify-center bg-white rounded-md shadow-sm font-bold">-</button>
            <span className="font-bold text-sm w-4 text-center">{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)} className="size-7 flex items-center justify-center bg-white rounded-md shadow-sm font-bold">+</button>
          </div>
        </div>

        {/* Fila 2: Precio y Botón */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">Total</span>
            <span className="text-xl font-extrabold text-primary">
              ${(planta.precio * cantidad).toLocaleString('es-CL')}
            </span>
          </div>
          <button 
            onClick={() => {
                for(let i=0; i<cantidad; i++) addToCart(planta);
            }}
            className="flex-1 h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            <span className="text-sm">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};