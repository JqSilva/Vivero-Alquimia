// src/components/cart/FloatingCart.tsx
'use client';
import { useCart } from '@/context/CartContext';

export const FloatingCart = () => {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 z-[55] animate-in slide-in-from-bottom-5">
      <button className="w-full bg-primary text-white h-14 rounded-2xl flex items-center justify-between px-6 shadow-2xl active:scale-95 transition-all">
        <div className="flex items-center gap-3">
          <span className="font-bold">{totalItems} items</span>
          <span className="w-px h-4 bg-white/30"></span>
          <span className="text-sm font-medium">Ver Carrito</span>
        </div>
        <p className="font-bold text-lg">${totalPrice.toLocaleString('es-CL')}</p>
      </button>
    </div>
  );
};