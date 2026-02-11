'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Planta } from '@/types';

// 1. Agregamos 'cantidad' a la interfaz
export interface CartItem extends Planta {
  fechaEntregaItem: string; 
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  // Ahora addToCart acepta cantidad opcional (útil para el + y -)
  addToCart: (planta: Planta, fechaSeleccionada: string, cantidad?: number) => void;
  removeFromCart: (plantaId: number, fechaEntregaItem: string) => void;
  clearCart: () => void;
  fechaEntrega: string | null;
  setFechaEntrega: (fecha: string) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fechaEntrega, setFechaEntregaState] = useState<string | null>(
    new Date().toISOString().split('T')[0]
  );

  const addToCart = (planta: Planta, fechaSeleccionada: string, cantidad: number = 1) => {
    setCart((prev) => {
      // BUSCAR SI EXISTE: Misma planta Y misma fecha
      const index = prev.findIndex(item => 
        item.id === planta.id && item.fechaEntregaItem === fechaSeleccionada
      );

      if (index !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: nuevoCarrito[index].cantidad + cantidad
        };
        return nuevoCarrito;
      }

      // Si no existe o la fecha es distinta, añadir como nuevo
      return [...prev, { ...planta, fechaEntregaItem: fechaSeleccionada, cantidad }];
    });
  };

  const removeFromCart = (plantaId: number, fechaEntregaItem: string) => {
    setCart((prev) => {
      const index = prev.findIndex(item => 
        item.id === plantaId && item.fechaEntregaItem === fechaEntregaItem
      );
      
      if (index !== -1) {
        const nuevoCarrito = [...prev];
        if (nuevoCarrito[index].cantidad > 1) {
          // Si hay más de uno, restamos cantidad
          nuevoCarrito[index] = { ...nuevoCarrito[index], cantidad: nuevoCarrito[index].cantidad - 1 };
        } else {
          // Si queda uno solo, eliminamos la fila
          nuevoCarrito.splice(index, 1);
        }
        return nuevoCarrito;
      }
      return prev;
    });
  };

  const clearCart = () => setCart([]);

  const setFechaEntrega = (fecha: string) => setFechaEntregaState(fecha);

  // totalItems sumando las cantidades individuales
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  
  const totalPrice = cart.reduce((acc, item) => {
    const precioBase = item.stock === 0 ? item.precio * 0.3 : item.precio;
    return acc + (precioBase * item.cantidad);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fechaEntrega, setFechaEntrega, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};