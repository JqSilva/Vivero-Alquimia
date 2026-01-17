'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Inicio', icon: 'home', path: '/' },
    { name: 'Carrito', icon: 'shopping_cart', path: '/cart' },
    { name: 'Favoritos', icon: 'favorite', path: '/favorites' },
    { name: 'Perfil', icon: 'person', path: '/profile' },

  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 backdrop-blur-xl border-t border-neutral-100 px-6 pt-2 pb-6 flex items-center justify-between z-[60]">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        return (
          <Link 
            key={item.name} 
            href={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "text-neutral-400"
            }`}
          >
            <span className={`material-symbols-outlined text-[26px] ${isActive ? "fill-1" : ""}`} style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
              {item.icon}
            </span>
            <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};