/* src/components/layout/BottomNav.tsx */

'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
            onClick={() => window.history.back()}
            className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm active:scale-90 transition-transform"
        >
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <h2 className="text-[#121716] text-sm font-bold leading-tight flex-1 text-center uppercase tracking-[0.2em]">
            Carrito De Compras
        </h2>

        <div className="flex w-10 items-center justify-end">
            <span className="material-symbols-outlined !text-2xl mr-2 text-primary" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>shopping_cart</span>
        </div>
    </div>
  );
};