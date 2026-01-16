'use client';

interface FloatingCartProps {
  itemCount: number;
  totalPrice: number;
  isVisible: boolean;
}

export const FloatingCart = ({ itemCount, totalPrice, isVisible }: FloatingCartProps) => {
  // Si no hay items, no mostramos el botón (lógica contextual)
  if (!isVisible || itemCount === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pointer-events-none z-[55]">
      <button 
        className="pointer-events-auto w-full bg-primary text-white h-14 rounded-2xl flex items-center justify-between px-6 shadow-2xl animate-pulse-subtle active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold">{itemCount} items</span>
          <span className="w-px h-4 bg-white/30"></span>
          <span className="text-sm font-medium">Ver Carrito</span>
        </div>
        <p className="font-bold text-lg">
          ${totalPrice.toLocaleString('es-CL')}
        </p>
      </button>
    </div>
  );
};