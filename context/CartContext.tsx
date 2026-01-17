'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Planta } from '@/types';

interface CartContextType {
  cart: Planta[];
  addToCart: (planta: Planta) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Planta[]>([]);

  const addToCart = (planta: Planta) => {
    setCart((prev) => [...prev, planta]);
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};