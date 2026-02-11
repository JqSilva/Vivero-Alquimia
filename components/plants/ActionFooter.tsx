'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Planta } from '@/types';

export const ActionFooter = ({ planta }: { planta: Planta }) => {
  const [cantidad, setCantidad] = useState(1);
  
  // Extraemos addToCart para guardar y fechaEntrega para saber qué eligió el usuario
  const { addToCart, fechaEntrega } = useCart(); 
  
  const sinStock = planta.stock === 0; 
  const precioFinal = sinStock ? (planta.precio * 0.3) : planta.precio; 

  const manejarClick = () => {
    // === PRINTS DE CONTROL (Debug) ===
    console.log("--- PROCESANDO AÑADIR AL CARRITO ---");
    console.log("🌿 Planta:", planta.nombre);
    console.log("📅 Fecha de Entrega desde el Contexto:", fechaEntrega);
    console.log("🔢 Cantidad:", cantidad);
    console.log("💰 ¿Es encargo (30%)?:", sinStock ? "SÍ" : "NO");
    console.log("------------------------------------");

    // Añadimos al carrito la cantidad de veces seleccionada
    for(let i=0; i < cantidad; i++) {
      addToCart(planta, fechaEntrega!); 
    }

    alert(`¡Listo! ${planta.nombre} añadido. Entrega programada para: ${fechaEntrega}`);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-white/95 backdrop-blur-md border-t border-zinc-100 z-[70] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-3">
        {/* Selector de Cantidad */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold text-zinc-400 uppercase">Cantidad</span>
          <div className="flex items-center gap-4 bg-zinc-100 rounded-lg p-1">
            <button 
              onClick={() => setCantidad(Math.max(1, cantidad - 1))} 
              className="size-7 bg-white rounded-md shadow-sm font-bold active:bg-zinc-50"
            >
              -
            </button>
            <span className="font-bold text-sm w-4 text-center">{cantidad}</span>
            <button 
              onClick={() => setCantidad(cantidad + 1)} 
              className="size-7 bg-white rounded-md shadow-sm font-bold active:bg-zinc-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Info de Precio y Botón Acción */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              {sinStock ? 'Seña Encargo' : 'Total a pagar'}
            </span>
            <span className="text-xl font-extrabold text-primary">
              ${(precioFinal * cantidad).toLocaleString('es-CL')}
            </span>
          </div>

          <button 
            onClick={manejarClick}
            className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-white ${
              sinStock ? "bg-zinc-900" : "bg-primary"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {sinStock ? 'assignment_late' : 'shopping_cart'}
            </span>
            <span className="text-sm">
              {sinStock ? 'Encargar Planta' : 'Añadir al Carrito'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};